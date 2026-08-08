import { RAGCorpusItem } from '../types';

export const DEFAULT_SRANAN_CORPUS: RAGCorpusItem[] = [
  // 1. Proverbs & Cultural Odo's
  {
    id: 'odo_01',
    title: 'Odo: Kondei na kondei',
    category: 'proverb',
    srananText: 'Kondei na kondei, lanti na lanti.',
    translation: 'Every country has its own customs, every people their own rules.',
    usageNotes: 'Expresses respect for local customs when traveling or interacting with host cultures.',
    tags: ['culture', 'proverb', 'respect', 'tradition'],
    source: 'Surinamese Oral Tradition & Odo Collection',
    dateAdded: '2026-08-01'
  },
  {
    id: 'odo_02',
    title: 'Odo: Meti inyi wata',
    category: 'proverb',
    srananText: 'Efu yu e libi na ini liba, no kosi krapasi.',
    translation: 'If you live in the river, do not insult the caiman.',
    usageNotes: 'Used to advise politeness and avoiding conflict with local authorities or hosts.',
    tags: ['proverb', 'wisdom', 'politeness', 'caution'],
    source: 'Surinamese Oral Tradition',
    dateAdded: '2026-08-01'
  },
  {
    id: 'odo_03',
    title: 'Odo: Safrisafri e nyan switi',
    category: 'proverb',
    srananText: 'Safrisafri e tyari bun futu nanga switi nyanyan.',
    translation: 'Patience and gentle steps bring good luck and sweet rewards.',
    usageNotes: 'Encourages patience during learning or difficult tasks.',
    tags: ['proverb', 'patience', 'encouragement'],
    source: 'Traditional Sranan Proverbs',
    dateAdded: '2026-08-01'
  },
  {
    id: 'odo_04',
    title: 'Odo: Kaka e singi',
    category: 'proverb',
    srananText: 'Kaka e singi fa a e sani fu en.',
    translation: 'Every rooster crows according to its own nature / Everyone speaks from their perspective.',
    usageNotes: 'Acknowledges diverse individual opinions.',
    tags: ['proverb', 'perspective', 'expression'],
    source: 'Surinamese Oral Tradition',
    dateAdded: '2026-08-01'
  },
  {
    id: 'odo_05',
    title: 'Odo: Wan fowru no e meki summer',
    category: 'proverb',
    srananText: 'Wan finga no kan piki kaka.',
    translation: 'One finger cannot pick up a louse / Working together is essential for success.',
    usageNotes: 'Emphasizes community solidarity (Mapan / Yepi makandra).',
    tags: ['proverb', 'community', 'cooperation'],
    source: 'Surinamese Heritage Collection',
    dateAdded: '2026-08-01'
  },

  // 2. Grammar Rules & Syntax Structure
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

  // 3. Essential Dictionary Terms & Cultural Expressions
  {
    id: 'dict_01',
    title: 'Dictionary: Fa waka & Greetings',
    category: 'dictionary',
    srananText: 'Fa waka: How are you doing? / How is it going? (Lit. How walk?)\nFa de: How are things?\nBun mamanten: Good morning\nBun bakadina: Good afternoon\nBun neti: Good night\nOdi odi: Friendly formal greeting',
    translation: 'Common Surinamese greetings and check-ins.',
    usageNotes: 'Universal greetings used across Paramaribo and all districts.',
    tags: ['dictionary', 'greetings', 'expressions'],
    source: 'Paramaribo Everyday Lexicon',
    dateAdded: '2026-08-01'
  },
  {
    id: 'dict_06',
    title: 'Dictionary: Natural Greetings & Welcome Rules',
    category: 'dictionary',
    srananText: 'Switi odi: A warm, pleasant greeting / hearty welcome\nWan bigi odi: A warm, hearty greeting (e.g., "Wan bigi odi kon na Café Delicia")\nWan switi kon: A warm welcome / Hearty arrival\nBun kon: Welcome!\nFa waka!: Hello! / How are you doing?\nRules: Never use "seryusu odi" for greetings or welcomes. In Sranantongo, "seryusu" means grave, solemn, or strict—not "warm" or "sincere". Use "wan bigi odi", "switi odi", "wan switi kon", or "bun kon" instead.',
    translation: 'Authentic Sranantongo welcome and greeting rules.',
    usageNotes: 'NEVER pair "seryusu" with "odi" or greetings. Use "wan bigi odi", "switi odi", "wan switi kon", or "bun kon".',
    tags: ['dictionary', 'greetings', 'etiquette', 'welcomes'],
    source: 'Sranantongo Lexicon & Usage Rules',
    dateAdded: '2026-08-06'
  },
  {
    id: 'dict_07',
    title: 'Dictionary: Kowru & Cold Water ( Kowru watra )',
    category: 'dictionary',
    srananText: 'Kowru: Cold / the cold / to cool down\nKowru watra: Cold water\nKowru dringi: Cold drink\nRules: Never use "koudi", "koudy", or "kewti watra" (these are AI hallucinations caused by forced Dutch suffixing of "koud"). Always use "kowru" for cold. "Koti watra" means to cross water/river.',
    translation: 'Authentic Sranantongo term for cold and cold water.',
    usageNotes: 'Strictly use "kowru" for cold. "Koudi" is an AI hallucination.',
    tags: ['dictionary', 'drinks', 'temperature', 'kowru'],
    source: 'SrananFlow Hallucinatie & Fouten-Checker',
    dateAdded: '2026-08-07'
  },
  {
    id: 'dict_08',
    title: 'Dictionary: Food Ordering & Preferences (Sa wani fu nyan)',
    category: 'dictionary',
    srananText: 'Sa wani fu nyan: Would like to eat (e.g., "San yu sa wani fu nyan?")\nWani nyan / Wani dringi: Want to eat / Want to drink\nRules: Never use "lobi fu nyan" when asking what someone wants to eat or order. "Lobi" denotes deep romantic or personal affection/love, not a polite dining preference. Use "sa wani fu nyan" or "wani nyan".',
    translation: 'Polite food and drink preference phrasing.',
    usageNotes: 'Use "sa wani fu nyan" for polite ordering ("would like to eat"). Avoid "lobi fu nyan".',
    tags: ['dictionary', 'food', 'dining', 'phrasing'],
    source: 'SrananFlow Hallucinatie & Fouten-Checker',
    dateAdded: '2026-08-07'
  },
  {
    id: 'dict_02',
    title: 'Dictionary: Expressions of Gratitude',
    category: 'dictionary',
    srananText: 'Gran tangi: Thank you very much / Big thanks\nTangi fu yu yepi: Thank you for your help\nSwiti srefi: Delicious / Fantastic / Really nice\nNo spang: Don\'t worry / No problem / It\'s all good',
    translation: 'Politeness and gratitude terminology.',
    usageNotes: '"No spang" is an iconic Surinamese expression of reassurance and relaxed positivity.',
    tags: ['dictionary', 'gratitude', 'slang', 'expressions'],
    source: 'Surinamese Lexicon & Idioms',
    dateAdded: '2026-08-01'
  },
  {
    id: 'dict_03',
    title: 'Dictionary: Surinamese Gastronomy & Dining',
    category: 'dictionary',
    srananText: 'Pom: Traditional festive dish made with tayer root and chicken.\nMoksi alesi: Mixed rice cooked with coconut milk, saltfish, pork or chicken.\nRoti: Flatbread served with curry chicken (doksi) and potatoes.\nSaoto: Surinamese Javanese chicken soup with boiled egg and fried chips.\nSwiti nyan: Bon appétit / Enjoy your meal.\nDringi: Drink / Beverage.',
    translation: 'Surinamese dishes and culinary terms.',
    usageNotes: 'Essential for restaurant and market scenario grounding.',
    tags: ['dictionary', 'food', 'culinary', 'culture'],
    source: 'Surinamese Gastronomy Guide',
    dateAdded: '2026-08-01'
  },
  {
    id: 'dict_04',
    title: 'Dictionary: Shopping, Market & Money',
    category: 'dictionary',
    srananText: 'Marwina / Markt: Market\nOmeni a e kostu?: How much does this cost?\nWan kilo: A kilogram\nAfi kilo: Half a kilogram\nKorting / Safrisafri préis: A small discount / reasonable price\nPai: Pay / Payment\nMoni: Money',
    translation: 'Market transactions, weight units, and pricing phrases.',
    usageNotes: 'Used when bargaining politely at Paramaribo Central Market.',
    tags: ['dictionary', 'shopping', 'market', 'money'],
    source: 'Paramaribo Commerce Terms',
    dateAdded: '2026-08-01'
  },
  {
    id: 'dict_05',
    title: 'Dictionary: Direction & Places in Town',
    category: 'dictionary',
    srananText: 'Reti-han: To the right (Right hand)\nKrooki-han: To the left (Left hand)\nWaka rektu fesi: Walk straight ahead\nKrosbei: Nearby / close by / near (e.g. "A de krosbei?")\nFoto: City / Paramaribo downtown\nBus: Public bus / Mini-bus transport\nStasyon: Terminal or stop / station\nDresi-oso: Pharmacy\nPe a presi de?: Where is the place located?',
    translation: 'Navigation and city landmarks.',
    usageNotes: 'Essential for direction-asking scenarios. Strictly use "krosbei" for nearby/close by.',
    tags: ['dictionary', 'directions', 'city', 'navigation', 'krosbei'],
    source: 'Surinamese Urban Geography',
    dateAdded: '2026-08-01'
  },

  // 4. Cultural & Social Contexts
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
  },

  // 5. Pronunciation & Phonetic Stress Guides
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
    phonetic: 'GRAN-TAN-gi FU A YE-pi',
    translation: 'Thank you very much for the help',
    usageNotes: 'Slight nasalization on GRAN-TAN-gi. Soft semi-vowel transition in YE-pi.',
    tags: ['pronunciation', 'politeness', 'stress-capitalized'],
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
  },

  // 6. Sranantongo Time Indicators & Concepts (Tijdsaanduidingen & Tijdsbegrippen)
  {
    id: 'time_01',
    title: 'Time: Relative Days (Tra esde, Esde, Tide, Tamara)',
    category: 'dictionary',
    srananText: 'Relatieve tijdsaanduidingen: tra esde (eergisteren), esde / esrede (gisteren), tide (vandaag), tamara (morgen), tra tamara (overmorgen), nownowde / dis\'ten (tegenwoordig). E.g., "Tra esde mi ben go luku mi sisa", "Esde mi sribi te aiti yuru", "Tide na munde", "Tamara mi o kon luku yu".',
    translation: 'Relative day anchors: day before yesterday (tra esde), yesterday (esde), today (tide), tomorrow (tamara), day after tomorrow (tra tamara), nowadays (nownowde / dis\'ten).',
    usageNotes: 'Essential day anchors in Sranantongo based on the 1986 orthography.',
    tags: ['time', 'days', 'calendar', 'relative-time', 'vocabulary'],
    source: 'Sranantongo Tijdsaanduidingen & Tijdsbegrippen (1986 Spelling)',
    dateAdded: '2026-08-08'
  },
  {
    id: 'time_02',
    title: 'Time: Days of the Week (Den dei fu a wiki)',
    category: 'dictionary',
    srananText: 'Den dei fu a wiki: sonde (zondag), munde (maandag), tudewroko (dinsdag = 2e werkdag), dridewroko (woensdag = 3e werkdag), fodewroko (donderdag = 4e werkdag), freida / freyda (vrijdag), satra (zaterdag). Note: Traditional ritual birth names (Winti) are called "deinen" (e.g., Kwasi/Kwasiba for Sunday, Kofi/Afiba for Friday).',
    translation: 'Days of the week: Sunday (sonde), Monday (munde), Tuesday (tudewroko), Wednesday (dridewroko), Thursday (fodewroko), Friday (freida), Saturday (satra).',
    usageNotes: 'Weekdays are named after workdays (tu=2, dri=3, fo=4 + dei + wroko). Sunday, Monday, Friday, Saturday originate from English/Dutch.',
    tags: ['time', 'days-of-week', 'calendar', 'vocabulary', 'culture'],
    source: 'Sranantongo Tijdsaanduidingen & Tijdsbegrippen (1986 Spelling)',
    dateAdded: '2026-08-08'
  },
  {
    id: 'time_03',
    title: 'Time: Parts of the Day (Fa a dei prati)',
    category: 'dictionary',
    srananText: 'Fa a dei prati (Dagdelen): musudei (vroege ochtend, ~3:00-5:00 AM), mamanten (ochtend, na zonsopkomst), brekten (middag/lunchtijd, ~12:00-3:00 PM), bakadina (namiddag), mofoneti (schemering/vroege avond, ~6:00-7:30 PM), neti (avond/nacht), mindrineti (middernacht, 12:00 AM), deiten (overdag).',
    translation: 'Parts of the day: early morning before daybreak (musudei), morning (mamanten), noontime/lunchtime (brekten), afternoon (bakadina), dusk/early evening (mofoneti), night (neti), midnight (mindrineti), daytime (deiten).',
    usageNotes: 'Used extensively for greetings (switi mamanten, bun bakadina, bun neti) and scheduling.',
    tags: ['time', 'parts-of-day', 'greetings', 'vocabulary'],
    source: 'Sranantongo Tijdsaanduidingen & Tijdsbegrippen (1986 Spelling)',
    dateAdded: '2026-08-08'
  },
  {
    id: 'time_04',
    title: 'Time: Telling Time & Clocks (Yuruten & Klokkijken)',
    category: 'dictionary',
    srananText: 'Yuruten nanga klokkijken: "O lati?" / "Otyuru?" (Hoe laat is het? / Welke tijd is het?), "yuru" / "uru" (uur / o\'clock, e.g. "Dri yuru" = Drie uur), "oloisi" (horloge / klok), "luku oloisi" (klokkijken). Minutes before/after: "Tin over dri" (10 over 3), "Half aiti" (half 8).',
    translation: 'Asking time and reading clocks: "O lati?" or "Otyuru?" means "What time is it?". "Yuru" means hour/o\'clock. "Oloisi" is clock/watch.',
    usageNotes: 'To ask the time, use "O lati?" or "Otyuru?".',
    tags: ['time', 'clock', 'asking-time', 'yuruten', 'vocabulary'],
    source: 'Sranantongo Tijdsaanduidingen & Tijdsbegrippen (1986 Spelling)',
    dateAdded: '2026-08-08'
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
