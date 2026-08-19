import { RAGCorpusItem } from '../../types';

export const SRANAN_STOP_WORDS = new Set([
  // Articles & Pronouns
  'a', 'na', 'en', 'den', 'yu', 'mi', 'wi', 'unu', 'un', 'i', 'y', 'w',
  // Prepositions & Conjunctions
  'fu', 'f', 'nanga', 'noso', 'ma', 'di', 'te', 'so', 'efu', 'bika', 'moro', 'leki', 'tok', 'tu', 'in', 'insei',
  // Auxiliary & Tense particles
  'e', 'sa', 'ben', 'de', 'mu', 'musu', 'o', 'kan', 'man',
  // Common adverbs / interrogatives
  'san', 'pe', 'fa', 'dya', 'dyaso', 'drape', 'disi', 'dati', 'wan', 'ala', 'srefi',
  // Common Dutch/English stop words
  'van', 'het', 'een', 'de', 'en', 'of', 'in', 'op', 'is', 'the', 'and', 'or', 'a', 'an', 'to', 'for', 'of', 'with'
]);

export const BASE_SRANAN_VOCAB = new Set([
  // 1. Pronouns, Articles & Particles
  'mi', 'yu', 'y\'', 'i', 'a', 'wi', 'w\'', 'unu', 'un', 'den', 'e', 'sa', 'ben', 'de', 'na', 'fu', 'f\'', 'nanga', 'ma', 'te', 'moro', 'disi', 'dati', 'wan',
  // 2. Common Verbs & Action Words
  'taki', 'tak', 'lobi', 'kon', 'go', 'gi', 'tan', 'sidon', 'nyan', 'nyanyan', 'dringi', 'prakseri', 'waka', 'meki', 'mek', 'trow', 'wani', 'wan\'', 'musu', 'mu', 'sabi', 'sab', 'yere', 'frei', 'firi', 'feti', 'tron', 'wroko', 'du', 'piki', 'bai', 'pai',
  // 3. Food, Drink & Cafe Terms
  'watra', 'kowru', 'faya', 'switi', 'te', 'kofi', 'merki', 'sukru', 'rekenin', 'kronto', 'brede', 'alen', 'fensre',
  // 4. Greetings, Courtesy & Expressions
  'odi', 'grantangi', 'tangi', 'danki', 'switi kon', 'morgu', 'mamanten', 'neti', 'bakadina', 'fa waka',
  // 5. Nouns & People
  'man', 'uma', 'pikin', 'oso', 'gran', 'lanti', 'moni', 'presi', 'doti', 'krabita', 'bokoboko', 'pisi', 'suma', 'sani', 'tori', 'boskopu', 'wenkri', 'winkri', 'wowoyo', 'w\'woyo', 'prani', 'pranasi', 'pranas\'', 'srananman', 'sranan-uma', 'mati', 'busi', 'libi',
  // 6. Adjectives, Adverbs & Interrogatives
  'san', 'pe', 'fa', 'bun', 'srefi', 'santi', 'santa', 'no', 'ai', 'iya', 'kweti', 'koti', 'krosbei', 'sranan', 'sranantongo', 'suriname', 'moi', 'dya', 'dyaso', 'drape', 'so', 'kaba', 'eti', 'bigi', 'so-so', 'a sani disi',
  // 7. Numbers
  'tu', 'dri', 'fo', 'feifi', 'siksi', 'seibi', 'seybi', 'aiti', 'ayti', 'neigi', 'neygi', 'tin', 'hondro'
]);

export function normalizeSrananKey(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u00C0-\u024F]/g, '')
    .replace(/\s+/g, ' ');
}

export function extractCorpusVocabularySet(corpus: RAGCorpusItem[]): Set<string> {
  const vocabSet = new Set<string>(BASE_SRANAN_VOCAB);

  for (const item of corpus) {
    if (item.srananText) {
      const tokens = item.srananText
        .toLowerCase()
        .replace(/[^\w\s\u00C0-\u024F]/g, ' ')
        .split(/\s+/)
        .filter((t) => t.length > 0);
      for (const t of tokens) {
        vocabSet.add(t);
      }
    }
    if (item.title) {
      const tokens = item.title
        .toLowerCase()
        .replace(/[^\w\s\u00C0-\u024F]/g, ' ')
        .split(/\s+/)
        .filter((t) => t.length > 0);
      for (const t of tokens) {
        if (t.length > 1) vocabSet.add(t);
      }
    }
    if (item.tags) {
      for (const tag of item.tags) {
        vocabSet.add(tag.toLowerCase());
      }
    }
  }

  return vocabSet;
}

export function findUngroundedWords(text: string, vocabSet: Set<string>): string[] {
  if (!text || !text.trim()) return [];

  const tokens = text
    .toLowerCase()
    .replace(/[^\w\s\u00C0-\u024F]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !/^\d+$/.test(t)); // Ignore single letters & numeric digits

  const ungrounded: string[] = [];
  for (const token of tokens) {
    if (!vocabSet.has(token)) {
      ungrounded.push(token);
    }
  }

  return Array.from(new Set(ungrounded));
}
