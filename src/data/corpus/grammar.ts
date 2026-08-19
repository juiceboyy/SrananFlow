import { RAGCorpusItem } from '../../types';

export const CURATED_GRAMMAR_RULES: RAGCorpusItem[] = [
  {
    id: 'gram_01',
    title: 'Grammar: Past Tense Marker (Ben)',
    category: 'grammar',
    srananText: 'A wortu "ben" e poti strak na fesi verbum fu sori a pasi ten. E.g., "Mi ben waka na foto" (I walked in the city), "A ben sabi a tori" (He/she knew the story).',
    translation: 'The particle "ben" is placed directly before the main verb to indicate past tense.',
    usageNotes: 'Crucial tense marker. Does not inflect by person (mi ben, yu ben, a ben, wi ben, den ben).',
    tags: ['grammar', 'past-tense', 'verbs', 'syntax'],
    source: 'Sranantongo Grammar Manual',
    dateAdded: '2026-08-01'
  },
  {
    id: 'gram_02',
    title: 'Grammar: Future Tense Marker (Sa / O)',
    category: 'grammar',
    srananText: 'A wortu "sa" (noso "o" in informal speech) e sori tamara ten. E.g., "Mi sa kon tamara" (I will come tomorrow), "Den o nyan es-esi" (They will eat soon).',
    translation: 'The particle "sa" (or "o" informally) indicates future tense.',
    usageNotes: 'Use "sa" for polite or definite future promises; "o" is common in daily speech.',
    tags: ['grammar', 'future-tense', 'verbs'],
    source: 'Sranantongo Syntax Guide',
    dateAdded: '2026-08-01'
  },
  {
    id: 'gram_03',
    title: 'Grammar: Continuous Aspect Marker (E)',
    category: 'grammar',
    srananText: 'A wortu "e" e poti na fesi verbum fu sori aksi di e pasa right now. E.g., "Mi e leisi a buku" (I am reading the book), "Fa yu e waka?" (How are you doing?).',
    translation: 'The particle "e" before a verb denotes ongoing progressive action (equivalent to -ing).',
    usageNotes: 'Do not confuse with the pronoun "e" or preposition "a".',
    tags: ['grammar', 'progressive', 'verbs', 'present'],
    source: 'Sranantongo Grammar Manual',
    dateAdded: '2026-08-01'
  },
  {
    id: 'gram_04',
    title: 'Grammar: Negation (No)',
    category: 'grammar',
    srananText: 'Poti "no" strak fosi a verbum noso tense auxiliary. E.g., "Mi no ben sabi" (I did not know), "A no e nyan meti" (He/she does not eat meat).',
    translation: 'Negation is expressed by placing "no" immediately before the verb or tense auxiliary.',
    usageNotes: 'Double negatives in Sranantongo reinforce negation (e.g., "Mi no abi wan sani" = I don\'t have anything).',
    tags: ['grammar', 'negation', 'syntax'],
    source: 'Sranan Language Structure',
    dateAdded: '2026-08-01'
  },
  {
    id: 'gram_05',
    title: 'Grammar: Possessive Pronouns (Mi, Yu, En, Wi, Unu, Den)',
    category: 'grammar',
    srananText: 'Possessive markers: mi (my), yu (your), en (his/her/its), wi (our), unu (your plural), den (their). Placed before noun: "mi oso" (my house), "wi mati" (our friend).',
    translation: 'Possessive pronouns precede the noun without change of form.',
    usageNotes: 'Add "fu" for emphatic possession: "a oso fu mi" (the house of mine).',
    tags: ['grammar', 'pronouns', 'possessive'],
    source: 'Sranantongo Essentials',
    dateAdded: '2026-08-01'
  },
  {
    id: 'time_05',
    title: 'Time: Time Adverbs (Handige Bijwoorden van Tijd)',
    category: 'grammar',
    srananText: 'Handige bijwoorden van tijd: didyonsro (zojuist/net), now (nu), nownow (nu meteen/direct), wantron / wante (onmiddellijk), wantron so (plotseling), fruku (vroeg), lati (laat), kaba / kba (al/reeds/klaar), ete (nog/nog steeds), ala ten (altijd), wan ten (ooit/eens), sranga (tijdelijk). E.g., "Didyonsro a bus kmopo fu dyaso", "Yu mu kon nownow!", "A no kon na oso ete".',
    translation: 'Time adverbs: just now (didyonsro), now (now), right now (nownow), immediately (wantron/wante), suddenly (wantron so), early (fruku), late (lati), already/finished (kaba/kba), still/yet (ete), always (ala ten), sometime (wan ten), temporarily (sranga).',
    usageNotes: 'Crucial adverbs for expressing sequence, duration, and urgency in conversation.',
    tags: ['time', 'adverbs', 'grammar', 'syntax', 'vocabulary'],
    source: 'Sranantongo Tijdsaanduidingen & Tijdsbegrippen (1986 Spelling)',
    dateAdded: '2026-08-08'
  }
];
