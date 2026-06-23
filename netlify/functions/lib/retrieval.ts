import { portfolioKnowledge, type PortfolioChunk } from '../data/portfolioKnowledge.js';

export type RetrievedChunk = PortfolioChunk & {
  score: number;
};

const STOP_WORDS = new Set([
  'a',
  'about',
  'and',
  'are',
  'as',
  'at',
  'be',
  'can',
  'for',
  'from',
  'her',
  'i',
  'in',
  'is',
  'it',
  'me',
  'of',
  'on',
  'or',
  'pegah',
  'salehi',
  'she',
  'tell',
  'the',
  'to',
  'what',
  'with',
  'you',
  'about',
  'og',
  'er',
  'en',
  'et',
  'ei',
  'om',
  'på',
  'pa',
  'med',
  'hva',
  'hvem',
  'kan',
  'jeg',
  'meg',
  'deg',
  'til',
  'fra',
  'som',
  'det',
  'den',
  'de',
]);

const SECTION_HINTS: Array<{ terms: string[]; section: PortfolioChunk['section']; boost: number }> = [
  { terms: ['email', 'e-post', 'epost', 'contact', 'kontakt', 'linkedin', 'github', 'scholar'], section: 'contact', boost: 14 },
  { terms: ['collaborate', 'collaboration', 'freelance', 'project inquiry', 'samarbeid', 'frilans'], section: 'collaboration', boost: 12 },
  { terms: ['cv', 'resume', 'curriculum', 'download', 'last ned'], section: 'cv', boost: 14 },
  { terms: ['education', 'phd', 'degree', 'university', 'uit', 'utdanning', 'doktorgrad'], section: 'education', boost: 12 },
  { terms: ['experience', 'work', 'job', 'career', 'min sone', 'simulamet', 'truviz', 'erfaring', 'jobb'], section: 'experience', boost: 12 },
  { terms: ['skill', 'skills', 'technology', 'technologies', 'tools', 'tech stack', 'ferdighet', 'teknologi'], section: 'skills', boost: 12 },
  { terms: ['project', 'projects', 'portfolio', 'rag', 'pix2pix', 'singan', 'whisper', 'vr', 'prosjekt'], section: 'project', boost: 12 },
  { terms: ['publication', 'paper', 'research', 'citation', 'h-index', 'publikasjon', 'artikkel', 'sitering'], section: 'publication', boost: 12 },
];

const SYNONYMS: Record<string, string[]> = {
  avatar: ['avatars', 'metahuman', 'audio2face', 'talking', 'portrait'],
  avatars: ['avatar', 'metahuman', 'audio2face', 'talking', 'portrait'],
  cv: ['resume', 'curriculum'],
  epost: ['email', 'contact'],
  'e-post': ['email', 'contact'],
  publications: ['publication', 'paper', 'papers', 'research'],
  publication: ['publications', 'paper', 'papers', 'research'],
  rag: ['retrieval', 'assistant', 'chatbot', 'llm'],
  resume: ['cv'],
  skills: ['skill', 'technologies', 'tools'],
  skill: ['skills', 'technologies', 'tools'],
  vr: ['virtual', 'unity', 'oculus'],
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const tokenize = (value: string) => {
  const normalized = normalize(value);
  const tokens = normalized
    .split(' ')
    .map((token) => token.trim())
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));

  const expanded = new Set(tokens);
  tokens.forEach((token) => {
    SYNONYMS[token]?.forEach((synonym) => expanded.add(normalize(synonym)));
  });

  return [...expanded];
};

const countMatches = (queryTokens: string[], target: string, weight: number) => {
  const normalizedTarget = normalize(target);
  return queryTokens.reduce((score, token) => {
    if (!token) {
      return score;
    }

    return normalizedTarget.includes(token) ? score + weight : score;
  }, 0);
};

const sectionBoost = (query: string, section: PortfolioChunk['section']) => {
  const normalizedQuery = normalize(query);

  return SECTION_HINTS.reduce((score, hint) => {
    if (hint.section !== section) {
      return score;
    }

    return hint.terms.some((term) => normalizedQuery.includes(normalize(term))) ? score + hint.boost : score;
  }, 0);
};

const scoreChunk = (query: string, chunk: PortfolioChunk) => {
  const queryTokens = tokenize(query);

  if (queryTokens.length === 0) {
    return chunk.section === 'profile' || chunk.section === 'contact' ? 1 : 0;
  }

  const titleScore = countMatches(queryTokens, chunk.title, 5);
  const tagScore = countMatches(queryTokens, chunk.tags.join(' '), 4);
  const sectionScore = countMatches(queryTokens, chunk.section, 3);
  const contentScore = countMatches(queryTokens, chunk.content, 1.5);
  const exactTitleScore = normalize(chunk.title).includes(normalize(query)) ? 10 : 0;

  return titleScore + tagScore + sectionScore + contentScore + exactTitleScore + sectionBoost(query, chunk.section);
};

export const retrievePortfolioChunks = (query: string, limit = 6): RetrievedChunk[] => {
  const scored = portfolioKnowledge
    .map((chunk) => ({
      ...chunk,
      score: scoreChunk(query, chunk),
    }))
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return portfolioKnowledge
      .filter((chunk) => chunk.section === 'profile' || chunk.section === 'contact' || chunk.section === 'collaboration')
      .slice(0, limit)
      .map((chunk) => ({ ...chunk, score: 1 }));
  }

  return scored.slice(0, limit);
};
