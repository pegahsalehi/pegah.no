import type { Handler, HandlerResponse } from '@netlify/functions';
import { connectLambda, getStore } from '@netlify/blobs';
import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { createHash } from 'node:crypto';
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

type UsageRecord = {
  count: number;
  date: string;
  updatedAt: string;
};

const DEFAULT_MODEL = 'gpt-4.1-mini';
const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_MESSAGES = 6;
const MAX_HISTORY_MESSAGE_LENGTH = 800;
const MAX_CONTEXT_CHUNKS = 6;
const DEFAULT_DAILY_LIMIT = 7;
const USAGE_STORE_NAME = 'portfolio-chat-usage';
const GREETING_MESSAGES = new Set([
  'hi',
  'hello',
  'hey',
  'hei',
  'hallo',
  'good morning',
  'good afternoon',
  'good evening',
]);
const GENERAL_HELP_MESSAGES = new Set([
  'help',
  'what can you do',
  'what can you help me with',
  'what can i ask',
  'how can you help',
  'hva kan du hjelpe med',
  'hva kan jeg spørre om',
  'hjelp',
]);

const json = (statusCode: number, body: Record<string, unknown>, extraHeaders: Record<string, string> = {}): HandlerResponse => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    ...extraHeaders,
  },
  body: JSON.stringify(body),
});

const resolveDailyLimit = () => {
  const configuredLimit = Number.parseInt(process.env.CHAT_DAILY_LIMIT ?? '', 10);
  return Number.isFinite(configuredLimit) && configuredLimit > 0 ? configuredLimit : DEFAULT_DAILY_LIMIT;
};

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

const limitReachedAnswer = (language: PortfolioLanguage) =>
  language === 'no'
    ? 'Du har nådd den daglige spørregrensen. Prøv igjen i morgen, eller kontakt Pegah direkte på e-post.'
    : 'You’ve reached the daily question limit. Please try again tomorrow or contact Pegah directly by email.';

const getHeader = (headers: Record<string, string | undefined>, name: string) => {
  const directValue = headers[name];

  if (directValue) {
    return directValue;
  }

  const lowerName = name.toLowerCase();
  const matchingKey = Object.keys(headers).find((key) => key.toLowerCase() === lowerName);
  return matchingKey ? headers[matchingKey] : undefined;
};

const connectBlobsContext = (event: unknown) => {
  if (!event || typeof event !== 'object' || !('blobs' in event)) {
    return;
  }

  const blobsEvent = event as { blobs?: unknown; headers?: unknown };

  if (typeof blobsEvent.blobs !== 'string' || !blobsEvent.headers || typeof blobsEvent.headers !== 'object') {
    return;
  }

  connectLambda(blobsEvent as Parameters<typeof connectLambda>[0]);
};

const getClientIp = (headers: Record<string, string | undefined>) => {
  const candidates = [
    'x-nf-client-connection-ip',
    'x-forwarded-for',
    'client-ip',
    'x-real-ip',
    'cf-connecting-ip',
    'true-client-ip',
  ];

  for (const headerName of candidates) {
    const value = getHeader(headers, headerName);

    if (!value) {
      continue;
    }

    const firstValue = value.split(',')[0]?.trim();

    if (firstValue) {
      return firstValue;
    }
  }

  return 'unknown-client';
};

const getUtcDateKey = () => new Date().toISOString().slice(0, 10);

const usageKeyForRequest = (headers: Record<string, string | undefined>, dateKey: string) => {
  const clientIp = getClientIp(headers);
  return createHash('sha256').update(`${dateKey}:${clientIp}`).digest('hex');
};

const readUsageRecord = async (key: string): Promise<{ record: UsageRecord | null; etag?: string }> => {
  const store = getStore(USAGE_STORE_NAME);
  const entry = await store.getWithMetadata(key, {
    consistency: 'strong',
    type: 'json',
  });

  if (!entry) {
    return { record: null };
  }

  const data = entry.data as Partial<UsageRecord> | null;
  const count = typeof data?.count === 'number' && Number.isFinite(data.count) ? data.count : 0;
  const date = typeof data?.date === 'string' ? data.date : getUtcDateKey();
  const updatedAt = typeof data?.updatedAt === 'string' ? data.updatedAt : new Date().toISOString();

  return {
    record: {
      count,
      date,
      updatedAt,
    },
    etag: entry.etag,
  };
};

const reserveDailyUsage = async (
  headers: Record<string, string | undefined>,
  dailyLimit: number,
): Promise<{ allowed: boolean; count: number; trackingAvailable: boolean }> => {
  const dateKey = getUtcDateKey();
  const usageKey = usageKeyForRequest(headers, dateKey);
  const store = getStore(USAGE_STORE_NAME);

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const { record, etag } = await readUsageRecord(usageKey);
    const currentCount = record?.date === dateKey ? record.count : 0;

    if (currentCount >= dailyLimit) {
      return { allowed: false, count: currentCount, trackingAvailable: true };
    }

    const nextRecord: UsageRecord = {
      count: currentCount + 1,
      date: dateKey,
      updatedAt: new Date().toISOString(),
    };

    const result = await store.setJSON(
      usageKey,
      nextRecord,
      etag ? { onlyIfMatch: etag } : { onlyIfNew: true },
    );

    if (result.modified) {
      return { allowed: true, count: nextRecord.count, trackingAvailable: true };
    }
  }

  console.warn('portfolio-chat quota write contention; allowing request without a confirmed quota reservation');
  return { allowed: true, count: 0, trackingAvailable: false };
};

const safeReserveDailyUsage = async (
  headers: Record<string, string | undefined>,
  dailyLimit: number,
): Promise<{ allowed: boolean; count: number; trackingAvailable: boolean }> => {
  try {
    return await reserveDailyUsage(headers, dailyLimit);
  } catch (error) {
    console.warn('portfolio-chat quota tracking unavailable; allowing request', error);
    return { allowed: true, count: 0, trackingAvailable: false };
  }
};

const normalizeIntentMessage = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9æøå\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const isGreetingOnly = (value: string) => GREETING_MESSAGES.has(normalizeIntentMessage(value));

const isGeneralHelpOnly = (value: string) => GENERAL_HELP_MESSAGES.has(normalizeIntentMessage(value));

const greetingAnswer = (language: PortfolioLanguage) =>
  language === 'no'
    ? 'Hei! Jeg kan hjelpe deg med å utforske Pegahs prosjekter, publikasjoner, ferdigheter, CV eller erfaring. Hva vil du vite mer om?'
    : 'Hi! I can help you explore Pegah’s projects, publications, skills, CV, or experience. What would you like to know?';

const generalHelpAnswer = (language: PortfolioLanguage) =>
  language === 'no'
    ? 'Du kan spørre meg om Pegahs prosjekter, publikasjoner, ferdigheter, CV, erfaring, utdanning eller kontaktinformasjon.'
    : 'You can ask me about Pegah’s projects, publications, skills, CV, experience, education, or contact details.';

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
  const language = resolveLanguage(payload.language);

  if (!message) {
    return json(400, { error: 'Message cannot be empty.' });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return json(413, { error: `Message is too long. Please keep it under ${MAX_MESSAGE_LENGTH} characters.` });
  }

  if (isGreetingOnly(message)) {
    return json(200, {
      answer: greetingAnswer(language),
      sources: [],
    });
  }

  if (isGeneralHelpOnly(message)) {
    return json(200, {
      answer: generalHelpAnswer(language),
      sources: [],
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return json(500, {
      error: 'OPENAI_API_KEY is not configured. Add it as a server-side Netlify environment variable for Functions.',
    });
  }

  const dailyLimit = resolveDailyLimit();
  connectBlobsContext(event);
  const quota = await safeReserveDailyUsage(event.headers, dailyLimit);

  if (!quota.allowed) {
    return json(429, {
      answer: limitReachedAnswer(language),
      sources: [],
      limitReached: true,
    });
  }

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
