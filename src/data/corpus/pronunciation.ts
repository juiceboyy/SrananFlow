import { RAGCorpusItem } from '../../types';

export const CURATED_PRONUNCIATION_GUIDES: RAGCorpusItem[] = [
  {
    id: 'pron_01',
    title: 'Pronunciation: Greeting & Melodic Cadence (Fa waka)',
    category: 'pronunciation',
    srananText: 'Fa waka, mi mati?',
    phonetic: 'FA WA-ka, mi MA-ti?',
    translation: 'How are you doing, my friend?',
    usageNotes: 'Melodic stress on CAPITALIZED syllables: FA WA-ka, mi MA-ti. Open vowels, avoiding Dutch guttural tone.',
    tags: ['pronunciation', 'greetings', 'stress-capitalized'],
    source: 'Sranantongo Phonetics Guide',
    dateAdded: '2026-08-03'
  },
  {
    id: 'pron_02',
    title: 'Pronunciation: Odo Rhythm (Safrisafri)',
    category: 'pronunciation',
    srananText: 'Safrisafri e nyan switi',
    phonetic: 'SAF-ri-SAF-ri e NYAN SWI-ti',
    translation: 'Patience brings sweet rewards / Take it easy',
    usageNotes: 'Rhythmic double stress on SAF-ri-SAF-ri. Nasal gliding on NYAN.',
    tags: ['pronunciation', 'rhythm', 'odo', 'stress-capitalized'],
    source: 'Sranantongo Phonetics Guide',
    dateAdded: '2026-08-03'
  },
  {
    id: 'pron_03',
    title: 'Pronunciation: Gratitude & Polite Vowels (Grantangi)',
    category: 'pronunciation',
    srananText: 'Grantangi fu a yepi',
    phonetic: 'gran-TANG-i FU A YE-pi',
    translation: 'Thank you very much for the help',
    usageNotes: 'Smooth continuous velar nasal [ŋ] gliding directly into "i" (gran-TANG-i), strictly with NO glottal stop and NO hard "g" or "k".',
    tags: ['pronunciation', 'politeness', 'stress-capitalized', 'velar-nasal'],
    source: 'Sranantongo Phonetics Guide',
    dateAdded: '2026-08-03'
  },
  {
    id: 'pron_04',
    title: 'Pronunciation: Continuous Motion (Mi e go na foto)',
    category: 'pronunciation',
    srananText: 'Mi e go na foto',
    phonetic: 'MI E GO NA FO-to',
    translation: 'I am going to Paramaribo city center',
    usageNotes: 'Flowing continuous vowel connection "MI E GO". Stress on FO-to.',
    tags: ['pronunciation', 'verbs', 'stress-capitalized'],
    source: 'Sranantongo Phonetics Guide',
    dateAdded: '2026-08-03'
  },
  {
    id: 'pron_05',
    title: 'Pronunciation: Vowel Clarity (Awi & Nyan)',
    category: 'pronunciation',
    srananText: 'Kon wi nyan switi nyanyan makandra',
    phonetic: 'KON WI NYAN SWI-ti NYAN-nyan MA-KAN-dra',
    translation: 'Come let us enjoy a delicious meal together',
    usageNotes: 'Clear open "a" and "i" vowels. Stress on KON WI and MA-KAN-dra.',
    tags: ['pronunciation', 'dining', 'vowels', 'stress-capitalized'],
    source: 'Sranantongo Phonetics Guide',
    dateAdded: '2026-08-03'
  }
];
