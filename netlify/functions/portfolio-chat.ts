import type { Handler, HandlerResponse } from '@netlify/functions';
import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { retrievePortfolioChunks } from './lib/retrieval.js';
import type { PortfolioLanguage } from './data/portfolioKnowledge.js';

type IncomingRole = 'user' | 'assistant';

type IncomingHistoryMessage = {
  role: IncomingRole;
  content: string;
};

type PortfolioChatPayload = {
  message?: unknown;
  history?: unknown;
  language?: unknown;
};

const DEFAULT_MODEL = 'gpt-4.1-mini';
const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_MESSAGES = 6;
const MAX_HISTORY_MESSAGE_LENGTH = 800;
const MAX_CONTEXT_CHUNKS = 6;

const json = (statusCode: number, body: Record<string, unknown>, extraHeaders: Record<string, string> = {}): HandlerResponse => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    ...extraHeaders,
  },
  body: JSON.stringify(body),
});

const parseJsonBody = (body: string | null, isBase64Encoded: boolean): PortfolioChatPayload | null => {
  if (!body) {
    return null;
  }

  const rawBody = isBase64Encoded ? Buffer.from(body, 'base64').toString('utf8') : body;
  return JSON.parse(rawBody) as PortfolioChatPayload;
};

const isIncomingRole = (role: unknown): role is IncomingRole => role === 'user' || role === 'assistant';

const sanitizeHistory = (history: unknown): IncomingHistoryMessage[] => {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter((item): item is IncomingHistoryMessage => {
      if (!item || typeof item !== 'object') {
        return false;
      }

      const candidate = item as Partial<IncomingHistoryMessage>;
      return isIncomingRole(candidate.role) && typeof candidate.content === 'string' && candidate.content.trim().length > 0;
    })
    .slice(-MAX_HISTORY_MESSAGES)
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, MAX_HISTORY_MESSAGE_LENGTH),
    }));
};

const resolveLanguage = (language: unknown): PortfolioLanguage => (language === 'no' ? 'no' : 'en');

const formatContext = (chunks: ReturnType<typeof retrievePortfolioChunks>) =>
  chunks
    .map(
      (chunk, index) =>
        `[${index + 1}] ${chunk.title}\nSection: ${chunk.section}\nSource: ${chunk.source}\n${chunk.content}`,
    )
    .join('\n\n');

const uniqueSources = (chunks: ReturnType<typeof retrievePortfolioChunks>) => {
  const sourceLabels = chunks.map((chunk) => `${chunk.source}: ${chunk.title}`);
  return [...new Set(sourceLabels)];
};

const buildSystemPrompt = (language: PortfolioLanguage, context: string) => {
  const languageInstruction =
    language === 'no'
      ? 'Svar på norsk. Behold offisielle publikasjonstitler på engelsk.'
      : 'Answer in English. Keep official publication titles in English.';

  return `You are the portfolio assistant for Pegah Salehi.
Use only the provided portfolio context as your source of truth.
${languageInstruction}

Rules:
- Answer questions about Pegah Salehi's CV, projects, publications, skills, education, links, contact information, and portfolio content.
- Do not invent dates, companies, publications, technologies, links, credentials, or personal details.
- If the context does not contain the answer, say that the portfolio context does not include that detail and suggest contacting Pegah at pghsalehi@gmail.com.
- Keep answers concise, professional, and helpful.
- Do not mention internal retrieval scores or hidden implementation details.

Portfolio context:
${context}`;
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed. Use POST.' }, { Allow: 'POST' });
  }

  let payload: PortfolioChatPayload | null;

  try {
    payload = parseJsonBody(event.body, event.isBase64Encoded);
  } catch {
    return json(400, { error: 'Invalid JSON body.' });
  }

  if (!payload || typeof payload.message !== 'string') {
    return json(400, { error: 'Message is required.' });
  }

  const message = payload.message.trim();

  if (!message) {
    return json(400, { error: 'Message cannot be empty.' });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return json(413, { error: `Message is too long. Please keep it under ${MAX_MESSAGE_LENGTH} characters.` });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return json(500, {
      error: 'OPENAI_API_KEY is not configured. Add it as a server-side Netlify environment variable for Functions.',
    });
  }

  const language = resolveLanguage(payload.language);
  const history = sanitizeHistory(payload.history);
  const chunks = retrievePortfolioChunks(message, MAX_CONTEXT_CHUNKS);
  const context = formatContext(chunks);
  const sources = uniqueSources(chunks);
  const model = process.env.OPENAI_MODEL?.trim() || DEFAULT_MODEL;

  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: buildSystemPrompt(language, context),
    },
    ...history.map<ChatCompletionMessageParam>((item) => ({
      role: item.role,
      content: item.content,
    })),
    {
      role: 'user',
      content: message,
    },
  ];

  try {
    const client = new OpenAI({ apiKey });
    const completion = await client.chat.completions.create({
      model,
      messages,
      temperature: 0.2,
    });

    const answer = completion.choices[0]?.message?.content?.trim();

    if (!answer) {
      return json(502, { error: 'The assistant did not return an answer. Please try again.', sources });
    }

    return json(200, {
      answer,
      sources,
    });
  } catch (error) {
    console.error('portfolio-chat OpenAI error', error);
    return json(502, {
      error: 'The portfolio assistant could not generate an answer right now. Please try again or contact Pegah by email.',
    });
  }
};
