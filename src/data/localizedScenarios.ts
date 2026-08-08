import { Scenario, LanguageCode } from '../types';

export interface LocalizedScenarioContent {
  title: string;
  description: string;
  partnerRole: string;
  userRole: string;
  location: string;
  keyVocabulary: { word: string; phonetic: string; translation: string }[];
  commonPhrases: { phrase: string; translation: string; audioText?: string }[];
  dialogueFlow: { stepTitle: string; partnerPrompt: string; suggestedUserResponses: string[] }[];
  cultureTip: string;
}

export function getPrepKitLabels(langCode: LanguageCode | string) {
  return {
    title: 'Scenario Brief & Preparation Kit',
    subtitle: 'Key Vocabulary, Useful Phrases, Conversation Flow & Cultural Etiquette',
    hideBrief: 'Hide Brief',
    openBrief: 'Open Brief',
    vocabTab: 'Key Vocabulary',
    phrasesTab: 'Common Phrases',
    flowTab: 'Dialogue Flow',
    cultureTab: 'Cultural Pro-Tip',
    addToNotebook: 'Add to Notebook',
    saved: 'Saved',
    useInChat: 'Use in Chat',
    aiExpects: 'AI Expects:',
    suggestedReplies: 'Suggested Replies:'
  };
}

export const LOCALIZED_SCENARIOS: Record<string, Partial<Record<string, LocalizedScenarioContent>>> = {
  cafe_order: {
    sr: {
      title: 'Ordering at a Cozy Café',
      description: 'Order warm drinks, pastries, and specify milk options with a friendly barista.',
      partnerRole: 'Barista at a local coffee shop',
      userRole: 'Customer stopping by for breakfast',
      location: 'Café Central',
      keyVocabulary: [
        { word: 'Wan kofi nanga merki', phonetic: 'wahn KOF-ee NAHN-gah MER-kee', translation: 'Coffee with milk' },
        { word: 'Fu tyari gowe', phonetic: 'foo TYAH-ree GOH-weh', translation: 'To go / take out' },
        { word: 'A rekenin, tangi', phonetic: 'ah REH-kehn-een TAHN-gee', translation: 'The bill, please' },
        { word: 'Sondro sukru', phonetic: 'SOHN-droh SOO-kroo', translation: 'Without sugar' }
      ],
      commonPhrases: [
        { phrase: 'Mi sa wani wan cappuccino, tangi.', translation: 'I would like a cappuccino, please.' },
        { phrase: 'Yu abi havermerki?', translation: 'Do you have oat milk?' },
        { phrase: 'Mi kan pai nanga kaart?', translation: 'Can I pay by card?' }
      ],
      dialogueFlow: [
        { stepTitle: '1. Greeting & Order Choice', partnerPrompt: 'San dringi yu sa wani fu nyan dyaso tide?', suggestedUserResponses: ['Mi sa wani wan kofi nanga merki, tangi.', 'Wan faya gron te, tangi.'] },
        { stepTitle: '2. Milk & Pastry Options', partnerPrompt: 'Yu wani havermerki noso wan nyun croissant kaba?', suggestedUserResponses: ['Nanga havermerki, tangi.', 'Mi sa wani wan croissant baka.'] },
        { stepTitle: '3. Payment & Departure', partnerPrompt: 'A de 4.50 SRD. Yu e pai nanga kassi noso kaart?', suggestedUserResponses: ['Mi e pai nanga kaart. Gran tangi!', 'Dya a kassi moni de. Meki yu abi wan switi dey.'] }
      ],
      cultureTip: 'In Paramaribo cafes, starting with a polite greeting like "Fa waka" or "Odi" and saying "Tangi" (Thank you) creates a warm, respectful tone.'
    },
    es: {
      title: 'Pedir en un Café Acogedor',
      description: 'Pide bebidas calientes, pasteles y especifica el tipo de leche con el barista.',
      partnerRole: 'Barista en la cafetería del barrio',
      userRole: 'Cliente pidiendo el desayuno',
      location: 'Café Central',
      keyVocabulary: [
        { word: 'Un café con leche', phonetic: 'oon kah-FEH kon LEH-cheh', translation: 'Coffee with milk' },
        { word: 'Para llevar', phonetic: 'PAH-rah yeh-VAR', translation: 'To go / takeaway' },
        { word: 'La cuenta, por favor', phonetic: 'lah KWEN-tah por fah-VOR', translation: 'The bill, please' },
        { word: 'Sin azúcar', phonetic: 'seen ah-THOO-kar', translation: 'Without sugar' }
      ],
      commonPhrases: [
        { phrase: 'Quisiera un capuchino, por favor.', translation: 'I would like a cappuccino, please.' },
        { phrase: '¿Tienen leche de avena?', translation: 'Do you have oat milk?' },
        { phrase: '¿Aceptan tarjeta de crédito?', translation: 'Do you accept credit cards?' }
      ],
      dialogueFlow: [
        { stepTitle: '1. Saludo y elección de bebida', partnerPrompt: '¿Qué le gustaría pedir hoy?', suggestedUserResponses: ['Quisiera un café con leche, por favor.', 'Un té verde caliente, por favor.'] },
        { stepTitle: '2. Personalización y pastel', partnerPrompt: '¿Desea leche de avena o un croissant?', suggestedUserResponses: ['Con leche de avena, por favor.', 'También quisiera un croissant fresco.'] },
        { stepTitle: '3. Pago y despedida', partnerPrompt: 'Son 4.50 en total. ¿Paga en efectivo o tarjeta?', suggestedUserResponses: ['Pago con tarjeta. ¡Muchas gracias!', 'Aquí tiene en efectivo. Que tenga buen día.'] }
      ],
      cultureTip: 'Decir "Por favor" y "Gracias" siempre abre puertas y crea una interacción cálida.'
    },
    fr: {
      title: 'Commander dans un Café Chaleureux',
      description: 'Commandez des boissons chaudes, des viennoiseries et précisez votre lait avec le barista.',
      partnerRole: 'Barista au café du quartier',
      userRole: 'Client venant prendre son petit-déjeuner',
      location: 'Café Central',
      keyVocabulary: [
        { word: 'Un café au lait', phonetic: 'uhn kah-FAY oh LAY', translation: 'Coffee with milk' },
        { word: 'À emporter', phonetic: 'ah ahm-por-TAY', translation: 'To go / takeaway' },
        { word: 'L’addition, s’il vous plaît', phonetic: 'lah-dee-SYON seel voo PLAY', translation: 'The bill, please' },
        { word: 'Sans sucre', phonetic: 'sahn SOO-kruh', translation: 'Without sugar' }
      ],
      commonPhrases: [
        { phrase: 'Je voudrais un cappuccino, s’il vous plaît.', translation: 'I would like a cappuccino, please.' },
        { phrase: 'Avez-vous du lait d’avoine ?', translation: 'Do you have oat milk?' },
        { phrase: 'Acceptez-vous la carte bancaire ?', translation: 'Do you accept credit cards?' }
      ],
      dialogueFlow: [
        { stepTitle: '1. Salutation et choix de boisson', partnerPrompt: 'Bonjour ! Que souhaitez-vous commander aujourd’hui ?', suggestedUserResponses: ['Je voudrais un café au lait, s’il vous plaît.', 'Un thé vert chaud, s’il vous plaît.'] },
        { stepTitle: '2. Personnalisation et viennoiserie', partnerPrompt: 'Souhaitez-vous du lait d’avoine ou un croissant avec ceci ?', suggestedUserResponses: ['Avec du lait d’avoine, s’il vous plaît.', 'Je vais aussi prendre un croissant frais.'] },
        { stepTitle: '3. Paiement et au revoir', partnerPrompt: 'Cela fera 4,50 €. Par carte ou en espèces ?', suggestedUserResponses: ['Je paie par carte. Merci beaucoup !', 'Voici en espèces. Bonne journée !'] }
      ],
      cultureTip: 'En France, commencer par un aimable "Bonjour" est indispensable avant de passer commande.'
    },
    de: {
      title: 'Bestellen in einem gemütlichen Café',
      description: 'Bestellen Sie Heißgetränke, Gebäck und wählen Sie Milchsorten beim Barista.',
      partnerRole: 'Barista im Nachbarschaftscafé',
      userRole: 'Kunde beim Frühstück',
      location: 'Café Central',
      keyVocabulary: [
        { word: 'Ein Kaffee mit Milch', phonetic: 'ine KAH-fay mit MILSH', translation: 'Coffee with milk' },
        { word: 'Zum Mitnehmen', phonetic: 'tsoom MIT-nay-men', translation: 'To go / takeaway' },
        { word: 'Die Rechnung, bitte', phonetic: 'dee RESH-noong BIT-teh', translation: 'The bill, please' },
        { word: 'Ohne Zucker', phonetic: 'OH-neh TSOO-ker', translation: 'Without sugar' }
      ],
      commonPhrases: [
        { phrase: 'Ich hätte gerne einen Cappuccino, bitte.', translation: 'I would like a cappuccino, please.' },
        { phrase: 'Haben Sie Hafermilch?', translation: 'Do you have oat milk?' },
        { phrase: 'Kann ich mit Karte zahlen?', translation: 'Can I pay by card?' }
      ],
      dialogueFlow: [
        { stepTitle: '1. Begrüßung & Getränkeauswahl', partnerPrompt: 'Hallo! Was möchten Sie heute bestellen?', suggestedUserResponses: ['Ich hätte gerne einen Kaffee mit Milch, bitte.', 'Einen heißen Grüntee, bitte.'] },
        { stepTitle: '2. Anpassungen & Gebäck', partnerPrompt: 'Möchten Sie Hafermilch oder ein Croissant dazu?', suggestedUserResponses: ['Mit Hafermilch, bitte.', 'Ich nehme auch ein frisches Croissant.'] },
        { stepTitle: '3. Bezahlung & Verabschiedung', partnerPrompt: 'Das macht 4,50 €. Bar oder mit Karte?', suggestedUserResponses: ['Ich zahle mit Karte. Vielen Dank!', 'Hier ist es bar. Einen schönen Tag noch!'] }
      ],
      cultureTip: 'Ein höfliches "Guten Tag" und "Bitte" sorgt immer für eine freundliche Bedienung.'
    },
    it: {
      title: 'Ordinare in un Caffè Accogliente',
      description: 'Ordina bevande calde, brioche e specifica il tipo di latte al barista.',
      partnerRole: 'Barista del bar di quartiere',
      userRole: 'Cliente che fa colazione',
      location: 'Café Central',
      keyVocabulary: [
        { word: 'Un caffè con latte', phonetic: 'oon kahf-FEH kon LAHT-teh', translation: 'Coffee with milk' },
        { word: 'Da portare via', phonetic: 'dah por-TAH-reh VEE-ah', translation: 'To go / takeaway' },
        { word: 'Il conto, per favore', phonetic: 'eel KOHN-toh per fah-VOH-reh', translation: 'The bill, please' },
        { word: 'Senza zucchero', phonetic: 'SEHN-tsah TSOOK-keh-roh', translation: 'Without sugar' }
      ],
      commonPhrases: [
        { phrase: 'Vorrei un cappuccino, per favore.', translation: 'I would like a cappuccino, please.' },
        { phrase: 'Avete il latte d’avena?', translation: 'Do you have oat milk?' },
        { phrase: 'Accettate carte di credito?', translation: 'Do you accept credit cards?' }
      ],
      dialogueFlow: [
        { stepTitle: '1. Saluto e scelta della bevanda', partnerPrompt: 'Buongiorno! Cosa vorrebbe ordinare oggi?', suggestedUserResponses: ['Vorrei un caffè con latte, per favore.', 'Un tè verde caldo, per favore.'] },
        { stepTitle: '2. Personalizzazione e brioche', partnerPrompt: 'Desidera latte d’avena o un cornetto fresco?', suggestedUserResponses: ['Con latte d’avena, grazie.', 'Vorrei anche un cornetto fresco.'] },
        { stepTitle: '3. Pagamento e saluti', partnerPrompt: 'Sono 4,50 €. Pagamento in contanti o carta?', suggestedUserResponses: ['Pago con carta. Grazie mille!', 'Ecco in contanti. Buona giornata!'] }
      ],
      cultureTip: 'In Italia fare colazione al banco è un rito veloce e conviviale.'
    },
    pt: {
      title: 'Pedir num Café Aconchegante',
      description: 'Peça bebidas quentes, doces e escolha o tipo de leite com o barista.',
      partnerRole: 'Barista do café do bairro',
      userRole: 'Cliente tomando café da manhã',
      location: 'Café Central',
      keyVocabulary: [
        { word: 'Um café com leite', phonetic: 'oom kah-FEH kom LAY-chee', translation: 'Coffee with milk' },
        { word: 'Para levar', phonetic: 'PAH-rah leh-VAR', translation: 'To go / takeaway' },
        { word: 'A conta, por favor', phonetic: 'ah KOHN-tah por fah-VOR', translation: 'The bill, please' },
        { word: 'Sem açúcar', phonetic: 'saym ah-SOO-kar', translation: 'Without sugar' }
      ],
      commonPhrases: [
        { phrase: 'Gostaria de um cappuccino, por favor.', translation: 'I would like a cappuccino, please.' },
        { phrase: 'Têm leite de aveia?', translation: 'Do you have oat milk?' },
        { phrase: 'Aceitam cartão de crédito?', translation: 'Do you accept credit cards?' }
      ],
      dialogueFlow: [
        { stepTitle: '1. Saudação e escolha da bebida', partnerPrompt: 'Olá! O que gostaria de pedir hoje?', suggestedUserResponses: ['Gostaria de um café com leite, por favor.', 'Um chá verde quente, por favor.'] },
        { stepTitle: '2. Personalização e croissant', partnerPrompt: 'Deseja leite de aveia ou um croissant fresco?', suggestedUserResponses: ['Com leite de aveia, por favor.', 'Também gostaria de um croissant fresco.'] },
        { stepTitle: '3. Pagamento e despedida', partnerPrompt: 'São 4,50 €. Vai pagar em dinheiro ou cartão?', suggestedUserResponses: ['Pago no cartão. Muito obrigado!', 'Aqui está em dinheiro. Tenha um bom dia!'] }
      ],
      cultureTip: 'Um "Por favor" e "Obrigado" tornam qualquer atendimento mais caloroso.'
    },
    en: {
      title: 'Ordering at a Cozy Café',
      description: 'Order warm drinks, pastries, and specify milk options with a friendly local barista.',
      partnerRole: 'Barista at a neighborhood coffee shop',
      userRole: 'Customer stopping by for breakfast',
      location: 'Café Central',
      keyVocabulary: [
        { word: 'A coffee with milk', phonetic: 'uh KAW-fee with milk', translation: 'Coffee with milk' },
        { word: 'To go / take out', phonetic: 'to go / tayk owt', translation: 'To go / take out' },
        { word: 'The bill, please', phonetic: 'thuh bill pleez', translation: 'The bill, please' },
        { word: 'Without sugar', phonetic: 'with-OWT SHOO-ger', translation: 'Without sugar' }
      ],
      commonPhrases: [
        { phrase: 'I would like a cappuccino, please.', translation: 'I would like a cappuccino, please.' },
        { phrase: 'Do you have oat milk?', translation: 'Do you have oat milk?' },
        { phrase: 'Do you accept credit cards?', translation: 'Do you accept credit cards?' }
      ],
      dialogueFlow: [
        { stepTitle: '1. Greeting & Drink Choice', partnerPrompt: 'Hi there! What can I get started for you today?', suggestedUserResponses: ['I would like a coffee with milk, please.', 'A hot green tea, please.'] },
        { stepTitle: '2. Customizations & Pastry', partnerPrompt: 'Would you like oat milk or a fresh croissant with that?', suggestedUserResponses: ['With oat milk, please.', 'I would also like a fresh croissant.'] },
        { stepTitle: '3. Payment & Farewell', partnerPrompt: 'That comes to 4.50. Paying cash or card?', suggestedUserResponses: ['Paying with card. Thanks so much!', 'Here is cash. Have a great day!'] }
      ],
      cultureTip: 'Adding "Please" and "Thank you" creates a warm and friendly exchange.'
    }
  },

  hotel_checkin: {
    sr: {
      title: 'Hotel Front Desk Check-In',
      description: 'Check into your hotel room, request a high floor, ask about Wi-Fi & breakfast hours.',
      partnerRole: 'Receptionist at the Plaza Hotel',
      userRole: 'Traveler arriving with a reservation',
      location: 'Hotel Reception Lobby',
      keyVocabulary: [
        { word: 'Wan reserfering', phonetic: 'wahn reh-SER-feh-ring', translation: 'A reservation' },
        { word: 'A Wi-Fi paswoortu', phonetic: 'ah wi-fi pas-WOOR-too', translation: 'The Wi-Fi password' },
        { word: 'Mamanten-nyanyan na ini', phonetic: 'mah-MAHN-tehn NYAHN-yahn', translation: 'Breakfast included' },
        { word: 'A lift', phonetic: 'ah LIFT', translation: 'The elevator' }
      ],
      commonPhrases: [
        { phrase: 'Mi abi wan reserfering tapu mi nen Smith.', translation: 'I have a reservation under Smith.' },
        { phrase: 'O ten a mamanten-nyanyan e staryu?', translation: 'What time is breakfast served?' },
        { phrase: 'Yu kan gi mi wan kamra moro hei?', translation: 'Could you give me a room on a high floor?' }
      ],
      dialogueFlow: [
        { stepTitle: '1. Present Reservation', partnerPrompt: 'Bun bakadina! San na yu nen nanga pasport?', suggestedUserResponses: ['Mi abi wan reserfering tapu mi nen.', 'Dya mi pasport de, tangi.'] },
        { stepTitle: '2. High Floor & Wi-Fi', partnerPrompt: 'Yu kamra de na fosi flur. Dya yu sotokey de.', suggestedUserResponses: ['Kande mi kan kisi wan kamra moro hei?', 'San na a Wi-Fi paswoortu?'] },
        { stepTitle: '3. Breakfast & Farewell', partnerPrompt: 'Mamanten-nyanyan e go fu 7 te 10 yuru mamanten.', suggestedUserResponses: ['Switi srefi, gran tangi fu yu yepi.', 'Pe a lift de?'] }
      ],
      cultureTip: 'When checking into hotels or guesthouses in Suriname, starting with a respectful greeting ("Bun bakadina", "Fa waka") makes check-in smooth and friendly.'
    }
  },

  directions: {
    sr: {
      title: 'Asking for City Directions',
      description: 'Find your way to the historic museum, bus station, or city plaza when lost.',
      partnerRole: 'Helpful resident on the street',
      userRole: 'Tourist holding a city map',
      location: 'Paramaribo Central Plaza',
      keyVocabulary: [
        { word: 'Na reti-han', phonetic: 'nah REH-tee hahn', translation: 'To the right' },
        { word: 'Na krooki-han', phonetic: 'nah KROO-kee hahn', translation: 'To the left' },
        { word: 'Rektu go na fesi', phonetic: 'REHK-too go nah FEH-see', translation: 'Go straight ahead' },
        { word: 'A stasyon', phonetic: 'ah stah-SYON', translation: 'The station' }
      ],
      commonPhrases: [
        { phrase: 'Pardon, pe a museum de?', translation: 'Excuse me, where is the museum?' },
        { phrase: 'A de fara noso mi kan waka go?', translation: 'Is it far or can I walk there?' },
        { phrase: 'Omeni miniti mi e waka?', translation: 'How many minutes does it take on foot?' }
      ],
      dialogueFlow: [
        { stepTitle: '1. Ask for Destination', partnerPrompt: 'Fa waka! Yu abi yepi fu feni wan presi?', suggestedUserResponses: ['Pardon, fa mi e doro na stasyon?', 'Mi e suku a museum, a de kosebi?'] },
        { stepTitle: '2. Clarify Route', partnerPrompt: 'Waka rektu fesi tu strati, drai na krooki-han kosebi a dresi-oso.', suggestedUserResponses: ['Mi e drai krooki-han baka a dresi-oso?', 'A de kosebi a park?'] },
        { stepTitle: '3. Thank & Confirm', partnerPrompt: 'Iya! Yu sa feni en es-esi.', suggestedUserResponses: ['Gran tangi fu yu yepi!', 'Meki yu abi wan switi dey!'] }
      ],
      cultureTip: 'Always start direction inquiries with a polite "Pardon" or "Fa waka".'
    }
  },

  market_shopping: {
    sr: {
      title: 'Shopping at a Local Street Market',
      description: 'Shop for fresh fruits, artisanal crafts, ask prices by weight, and negotiate politely.',
      partnerRole: 'Market Vendor at fresh produce stand',
      userRole: 'Shopper looking for fresh fruits and souvenirs',
      location: 'Paramaribo Central Market',
      keyVocabulary: [
        { word: 'Omeni a sani disi e kostu?', phonetic: 'oh-MEH-nee ah SAH-nee DEE-see eh KOS-too', translation: 'How much does this cost?' },
        { word: 'Wan kilo mango', phonetic: 'wahn KEE-loh MAN-goh', translation: 'A kilo of mangoes' },
        { word: 'A de nyun srefi', phonetic: 'ah deh NYOON SREH-fee', translation: 'It is very fresh' },
        { word: 'Wan pikin safrisafri preis', phonetic: 'wahn PEE-keen sah-free-SAH-free PRAYEE', translation: 'A discount' }
      ],
      commonPhrases: [
        { phrase: 'Omeni wan kilo mango de?', translation: 'How much is a kilo of mangoes?' },
        { phrase: 'Gi mi afu kilo, tangi.', translation: 'Give me half a kilo, please.' },
        { phrase: 'Yu kan gi mi wan pikin korting noso safrisafri preis?', translation: 'Can you give me a small discount?' }
      ],
      dialogueFlow: [
        { stepTitle: '1. Inquire Price', partnerPrompt: 'Ala sani koti tide mamanten fes-fesi!', suggestedUserResponses: ['Omeni a kilo mango de?', 'A e luku switi srefi, omeni a de?'] },
        { stepTitle: '2. Specify Quantity', partnerPrompt: 'A de 3 SRD per kilo. Omeni yu sa wani?', suggestedUserResponses: ['Gi mi wan kilo nanga afu, tangi.', 'Poti afu kilo mango baka fu mi.'] },
        { stepTitle: '3. Payment & Farewell', partnerPrompt: 'A de 5 SRD makandra. Wan tra sani baka?', suggestedUserResponses: ['A bun, dya a moni de. Gran tangi!', 'Yu kan gi mi wan tas, tangi?'] }
      ],
      cultureTip: 'At Paramaribo markets, vendors enjoy warm conversation and good humor.'
    }
  },

  pharmacy_visit: {
    sr: {
      title: 'Pharmacy & Health Consultation',
      description: 'Describe minor ailments like headache, fever, or stomach pain to a pharmacist.',
      partnerRole: 'Pharmacist at the local apothecary',
      userRole: 'Patient seeking over-the-counter medicine',
      location: 'Paramaribo Pharmacy',
      keyVocabulary: [
        { word: 'Mi hedi e hati mi', phonetic: 'mee HEH-dee eh HAH-tee mee', translation: 'My head hurts' },
        { word: 'Mi abi faya', phonetic: 'mee AH-bee FAH-yah', translation: 'I have a fever' },
        { word: 'Wan dresi fu koskosi', phonetic: 'wahn DREH-see foo KOS-kos-ee', translation: 'Cough syrup' },
        { word: 'Ala 8 yuru', phonetic: 'AH-lah AH-teh YOO-roo', translation: 'Every eight hours' }
      ],
      commonPhrases: [
        { phrase: 'Mi e firi flaw sinsi esde.', translation: 'I have been feeling unwell since yesterday.' },
        { phrase: 'Yu abi wan dresi fu gorro-hati?', translation: 'Do you have something for a sore throat?' },
        { phrase: 'Mi abi recept nodig fu disi?', translation: 'Do I need a prescription for this?' }
      ],
      dialogueFlow: [
        { stepTitle: '1. Describe Symptoms', partnerPrompt: 'San e hati yu tide?', suggestedUserResponses: ['Mi hedi nanga mi gorro e hati mi.', 'Mi beli e hati mi sinsi esde.'] },
        { stepTitle: '2. Dosage Instructions', partnerPrompt: 'Mi e raati disi. Dringi 1 spun ala 8 yuru.', suggestedUserResponses: ['Mi mu dringi en fosi noso baka nyan?', 'A abi wan takru efekti?'] },
        { stepTitle: '3. Purchase & Get Well', partnerPrompt: 'Dringi furu watra nanga en. Meki yu kon bun es-esi!', suggestedUserResponses: ['Gran tangi fu a yepi nanga dresi.', 'Omeni mi mu pai?'] }
      ],
      cultureTip: 'Pharmacists in Suriname offer helpful advice for common ailments before visiting a doctor.'
    }
  },

  restaurant_dining: {
    sr: {
      title: 'Dining at a Fine Restaurant',
      description: 'Reserve a table, ask about daily specials, check food allergies, and order drinks.',
      partnerRole: 'Waiter at a Surinamese bistro',
      userRole: 'Diner celebrating with friends',
      location: 'Paramaribo River Bistro',
      keyVocabulary: [
        { word: 'A chef spesrutu nyan', phonetic: 'ah chef speh-SROO-too NYAHN', translation: 'Chef’s recommendation' },
        { word: 'Mi de allergisch fu fisi', phonetic: 'mee deh ah-LER-geesch foo VEE-see', translation: 'I am allergic to fish' },
        { word: 'Moro bigi nyan', phonetic: 'MOH-roh BEE-gee NYAHN', translation: 'Main course' },
        { word: 'Wan glas dringi', phonetic: 'wahn GLAS DREHN-gee', translation: 'A glass of drink' }
      ],
      commonPhrases: [
        { phrase: 'San na a spesrutu nyan fu tide?', translation: 'What is the dish of the day?' },
        { phrase: 'Yu abi nyan fu sma di no e nyan meti?', translation: 'Do you have vegetarian options?' },
        { phrase: 'A nyan dyaso switi srefi, gran tangi!', translation: 'It was delicious, compliments to the chef.' }
      ],
      dialogueFlow: [
        { stepTitle: '1. Seating & Drinks', partnerPrompt: 'Kon insei! Dya den menu de. San yu sa wani fu dringi?', suggestedUserResponses: ['Wan botro watra, tangi.', 'Wan glas safrisafri dringi.'] },
        { stepTitle: '2. Ordering Food', partnerPrompt: 'Yu klari fu bestel a moro bigi nyan?', suggestedUserResponses: ['San na a spesrutu nyan fu a oso?', 'Mi sa wani a roti nanga doksi, tangi.'] },
        { stepTitle: '3. Dessert & Bill', partnerPrompt: 'Yu wani wan pikin kuki noso kofi fosi a rekenin?', suggestedUserResponses: ['Gi mi a rekenin ten yu kan, tangi.', 'Wan espresso kofi fu kaba.'] }
      ],
      cultureTip: 'Dining is unhurried. Asking politely for the bill ("A rekenin, tangi") signals when you are ready to pay.'
    }
  },

  casual_friendship: {
    sr: {
      title: 'Making a New Friend at a Park',
      description: 'Chat about hobbies, weekend plans, favorite travel spots, and life in the city.',
      partnerRole: 'Friendly local resident sharing common interests',
      userRole: 'New resident eager to practice language and make friends',
      location: 'Palm Garden Park (Palmentuin)',
      keyVocabulary: [
        { word: 'Den sani mi e lobi du', phonetic: 'den SAH-nee mee eh LOH-bee doo', translation: 'My hobbies' },
        { word: 'A weekend', phonetic: 'ah week-END', translation: 'The weekend' },
        { word: 'Mi e lobi waka go na tra presi', phonetic: 'mee eh LOH-bee WAH-kah', translation: 'I love to travel' },
        { word: 'Dringi wan kofi makandra', phonetic: 'DREHN-gee wahn KOF-ee mah-KAN-drah', translation: 'Grab a coffee together' }
      ],
      commonPhrases: [
        { phrase: 'Mi doro na a foto disi tu mun pasa.', translation: 'I arrived in this city two months ago.' },
        { phrase: 'San yu e lobi du in yu fri ten?', translation: 'What do you like doing in your free time?' },
        { phrase: 'Wi kan gi noso telefon-nommer fu miti wan tra dey.', translation: 'We could exchange numbers to meet up another day.' }
      ],
      dialogueFlow: [
        { stepTitle: '1. Break the Ice', partnerPrompt: 'A weer e switi srefi tide! Yu e libi dyaso langa kaba?', suggestedUserResponses: ['Mi de nyun dyaso fu leri a tongo.', 'Mi e kon na a park fu leisi buku in weekend.'] },
        { stepTitle: '2. Shared Hobbies', partnerPrompt: 'A dati switi! San na den sani yu e lobi du fu prisiri?', suggestedUserResponses: ['Mi e lobi knip prenki nanga waka in busi.', 'Mi e lobi koki nyan fu difrenti kondre.'] },
        { stepTitle: '3. Stay in Touch', partnerPrompt: 'Wi mu dringi wan kofi wan dey makandra!', suggestedUserResponses: ['Mi sa wani dati! Poti mi nommer.', 'Bun idei! Wi sa taki na weekend.'] }
      ],
      cultureTip: 'Palmentuin and open parks in Paramaribo are vibrant social spaces where locals are welcoming to newcomers.'
    }
  },

  free_talk: {
    sr: {
      title: 'Open Free-Form Practice',
      description: 'Talk freely about any topic under the sun! Your patient AI partner adapts fluidly in Sranantongo.',
      partnerRole: 'Patient Sranantongo Language Tutor',
      userRole: 'Language Learner practicing natural conversation',
      location: 'Virtual Lounge',
      keyVocabulary: [
        { word: 'Na mi opieksie / meki mi taki', phonetic: 'nah mee oh-PEEK-see', translation: 'In my opinion' },
        { word: 'San yu e denki?', phonetic: 'san yoo eh DEN-kee', translation: 'What do you think?' },
        { word: 'Kulti nanga poki', phonetic: 'KOOL-tee NAHN-gah POH-kee', translation: 'Culture and music' },
        { word: 'Leri tongo', phonetic: 'LEH-ree TON-goh', translation: 'Learning languages' }
      ],
      commonPhrases: [
        { phrase: 'Mi sa wani fu taki fu sranan poki.', translation: 'I would like to talk about local music.' },
        { phrase: 'Yu kan meki mi sabi ten mi meki fowtu?', translation: 'Could you correct me if I make mistakes?' },
        { phrase: 'Fa sma e taki a wortu disi in Sranantongo?', translation: 'How do you say this word in your language?' }
      ],
      dialogueFlow: [
        { stepTitle: '1. Topic Selection', partnerPrompt: 'Sortu tori yu sa wani taki fu en tide?', suggestedUserResponses: ['Meki wi taki fu trip nanga kulti.', 'Mi sa wani fu praktijk taki fu mi wroko.'] },
        { stepTitle: '2. Deepen Conversation', partnerPrompt: 'Switi tori! Weisani dati e plesi yu so?', suggestedUserResponses: ['Bikasi a e yepi mi fu verstan kondre.', 'Bikasi mi e plani fu go trip tamara.'] },
        { stepTitle: '3. Wrap-Up & Feedback', partnerPrompt: 'Yu taki meki verstan krin! Yu abi aksie baka?', suggestedUserResponses: ['Sortu wortu mi mu meki bun baka?', 'Gran tangi fu a switi leri!'] }
      ],
      cultureTip: 'Don’t worry about making mistakes! Free conversation builds confidence and natural speaking rhythm.'
    }
  }
};

export function getLocalizedScenario(scenario: Scenario, targetLangCode: LanguageCode | string): Scenario {
  const code = (targetLangCode as string) || 'sr';
  const localMap = LOCALIZED_SCENARIOS[scenario.id];

  if (!localMap) {
    return scenario;
  }

  // Pick target language localization first. If missing, pick Sranantongo ('sr').
  const localizedContent = localMap[code] || localMap['sr'] || localMap['en'] || Object.values(localMap)[0];

  if (!localizedContent) {
    return scenario;
  }

  return {
    ...scenario,
    title: localizedContent.title || scenario.title,
    description: localizedContent.description || scenario.description,
    partnerRole: localizedContent.partnerRole || scenario.partnerRole,
    userRole: localizedContent.userRole || scenario.userRole,
    location: localizedContent.location || scenario.location,
    keyVocabulary: localizedContent.keyVocabulary || scenario.keyVocabulary,
    commonPhrases: localizedContent.commonPhrases || scenario.commonPhrases,
    dialogueFlow: localizedContent.dialogueFlow || scenario.dialogueFlow,
    cultureTip: localizedContent.cultureTip || scenario.cultureTip
  };
}
