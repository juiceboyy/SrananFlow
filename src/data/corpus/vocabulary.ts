import { RAGCorpusItem } from '../../types';

export const CURATED_VOCABULARY_TERMS: RAGCorpusItem[] = [
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
  }
];
