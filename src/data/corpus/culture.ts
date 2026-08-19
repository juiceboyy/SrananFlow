import { RAGCorpusItem } from '../../types';

export const CURATED_CULTURE_NOTES: RAGCorpusItem[] = [
  {
    id: 'cult_01',
    title: 'Culture: Respeki nanga Odi (Respect and Greetings)',
    category: 'cultural',
    srananText: 'In Suriname, starting any conversation—whether at a hotel, market, or office—with a warm personal greeting ("Fa waka", "Bun bakadina", "Odi") is considered essential manners. Asking directly for something without a greeting is considered abrupt.',
    translation: 'Social norm: Always greet before requesting assistance.',
    usageNotes: 'AI partners should model this warmth and acknowledge greetings.',
    tags: ['culture', 'etiquette', 'greetings', 'social-norms'],
    source: 'Surinamese Cultural Etiquette Manual',
    dateAdded: '2026-08-01'
  },
  {
    id: 'cult_02',
    title: 'Culture: No Spang Mindset (Relaxed Hospitality)',
    category: 'cultural',
    srananText: '"No spang" reflects the Surinamese mindset of calm composure, warmth, and hospitality. Mistakes made by language learners are received with encouragement, laughter, and appreciation.',
    translation: 'The "No spang" philosophy of patient, relaxed interaction.',
    usageNotes: 'Guides the AI partner\'s patient, encouraging tone during practice.',
    tags: ['culture', 'hospitality', 'mindset'],
    source: 'Surinamese Cultural Studies',
    dateAdded: '2026-08-01'
  }
];
