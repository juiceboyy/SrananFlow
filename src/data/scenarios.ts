import { Scenario } from '../types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'cafe_order',
    title: 'Ordering at a Cozy Café',
    description: 'Order warm drinks, pastries, and specify milk options with a friendly local barista.',
    category: 'dining',
    partnerRole: 'Barista at a neighborhood coffee shop',
    userRole: 'Customer stopping by for breakfast',
    location: 'Café Central',
    difficulty: 'A1',
    icon: 'Coffee',
    color: 'from-amber-500 to-orange-600',
    initialGreeting: {
      es: '¡Hola! Bienvenido a Café Delicia. ¿Qué te gustaría pedir hoy?',
      fr: 'Bonjour ! Bienvenue au Café de Paris. Que souhaitez-vous commander aujourd’hui ?',
      de: 'Hallo! Willkommen im Café Central. Was möchten Sie heute bestellen?',
      it: 'Ciao! Benvenuto al Café Italia. Cosa vorresti ordinare oggi?',
      pt: 'Olá! Bem-vindo ao Café Central. O que gostaria de pedir hoje?',
      en: 'Hi there! Welcome to the corner café. What can I get started for you today?',
      sr: 'Fa waka! Switi kon na Café Delicia. San yu sa wani fu dringi noso nyan dyaso tide?'
    },
    keyVocabulary: [
      { word: 'Un café con leche', phonetic: 'oon kah-FEH kon LEH-cheh', translation: 'Coffee with milk' },
      { word: 'Para llevar', phonetic: 'PAH-rah yeh-VAR', translation: 'To go / take out' },
      { word: 'La cuenta, por favor', phonetic: 'lah KWEN-tah por fah-VOR', translation: 'The bill, please' },
      { word: 'Sin azúcar', phonetic: 'seen ah-THOO-kar', translation: 'Without sugar' }
    ],
    commonPhrases: [
      { phrase: 'Quisiera un capuchino, por favor.', translation: 'I would like a cappuccino, please.', audioText: 'Quisiera un capuchino por favor.' },
      { phrase: '¿Tienen leche de avena?', translation: 'Do you have oat milk?', audioText: '¿Tienen leche de avena?' },
      { phrase: '¿Aceptan tarjeta de crédito?', translation: 'Do you accept credit cards?', audioText: '¿Aceptan tarjeta de crédito?' }
    ],
    dialogueFlow: [
      { stepTitle: '1. Greeting & Drink Choice', partnerPrompt: 'What drink would you like?', suggestedUserResponses: ['Quisiera un café con leche, por favor.', 'Un té verde calientito, por favor.'] },
      { stepTitle: '2. Customizations & Pastry', partnerPrompt: 'Would you like oat milk or a croissant with that?', suggestedUserResponses: ['Con leche de avena, por favor.', 'También quisiera un croissant fresco.'] },
      { stepTitle: '3. Payment & Farewell', partnerPrompt: 'That will be 4.50. Paying cash or card?', suggestedUserResponses: ['Pago con tarjeta. ¡Muchas gracias!', 'Aquí tiene en efectivo. Que tenga buen día.'] }
    ],
    cultureTip: 'In many European cafés, asking politely with "Por favor" or "S’il vous plaît" before ordering sets a warm, polite tone. Tipping is often small rounding up.'
  },
  {
    id: 'hotel_checkin',
    title: 'Hotel Front Desk Check-In',
    description: 'Check into your hotel room, request a high floor, ask about Wi-Fi & breakfast hours.',
    category: 'travel',
    partnerRole: 'Concierge at the Grand Plaza Hotel',
    userRole: 'Traveler arriving with a reservation',
    location: 'Hotel Reception Lobby',
    difficulty: 'A2',
    icon: 'Hotel',
    color: 'from-blue-500 to-cyan-600',
    initialGreeting: {
      es: 'Buenas tardes. Bienvenido al Hotel Plaza. ¿Tiene una reserva con nosotros?',
      fr: 'Bonsoir et bienvenue à l’Hôtel Grand Plaza. Avez-vous une réservation ?',
      de: 'Guten Tag! Willkommen im Hotel Plaza. Haben Sie eine Reservierung bei uns?',
      it: 'Buonasera! Benvenuto all’Hotel Plaza. Ha una prenotazione?',
      pt: 'Boa tarde! Bem-vindo ao Hotel Plaza. Você tem uma reserva conosco?',
      en: 'Good afternoon and welcome to the Grand Hotel. Do you have a reservation with us?',
      sr: 'Bun bakadina! Switi kon na Hotel Plaza. Yu abi wan reserfering kaba?'
    },
    keyVocabulary: [
      { word: 'Una reserva', phonetic: 'oo-nah reh-SER-vah', translation: 'A reservation' },
      { word: 'La contraseña del Wi-Fi', phonetic: 'kon-trah-SEH-nyah del wi-fi', translation: 'The Wi-Fi password' },
      { word: 'El desayuno incluido', phonetic: 'el deh-sah-YOO-noh in-kloo-EE-doh', translation: 'Breakfast included' },
      { word: 'El ascensor', phonetic: 'el ahs-then-SOR', translation: 'The elevator' }
    ],
    commonPhrases: [
      { phrase: 'Tengo una reserva a nombre de Smith.', translation: 'I have a reservation under Smith.', audioText: 'Tengo una reserva a nombre de Smith.' },
      { phrase: '¿A qué hora se sirve el desayuno?', translation: 'What time is breakfast served?', audioText: '¿A qué hora se sirve el desayuno?' },
      { phrase: '¿Podría darme una habitación en un piso alto?', translation: 'Could you give me a room on a high floor?', audioText: '¿Podría darme una habitación en un piso alto?' }
    ],
    dialogueFlow: [
      { stepTitle: '1. Present Reservation', partnerPrompt: 'Welcome! May I have your name and passport?', suggestedUserResponses: ['Tengo una reserva a mi nombre.', 'Aquí tiene mi pasaporte.'] },
      { stepTitle: '2. Special Requests', partnerPrompt: 'Your room is on the 3rd floor. Here are your keys.', suggestedUserResponses: ['¿Sería posible una habitación en piso más alto?', '¿Cuál es la clave del Wi-Fi?'] },
      { stepTitle: '3. Breakfast & Amenities', partnerPrompt: 'Breakfast is served from 7 to 10 AM on the 1st floor.', suggestedUserResponses: ['Excelente, muchas gracias por su ayuda.', '¿Dónde está el ascensor?'] }
    ],
    cultureTip: 'In hotels across Japan and Europe, hand over payment cards or passports with both hands or place them on the small tray on the counter.'
  },
  {
    id: 'directions',
    title: 'Asking for City Directions',
    description: 'Find your way to the historic museum, subway station, or central plaza when lost.',
    category: 'travel',
    partnerRole: 'Helpful local resident on the street',
    userRole: 'Tourist holding a city map',
    location: 'Historic City Plaza',
    difficulty: 'A2',
    icon: 'MapPin',
    color: 'from-emerald-500 to-teal-600',
    initialGreeting: {
      es: '¡Hola! Te ves un poco confundido con ese mapa. ¿Necesitas ayuda para encontrar algún lugar?',
      fr: 'Bonjour ! Vous avez l’air un peu perdu avec cette carte. Puis-je vous aider ?',
      de: 'Hallo! Sie sehen etwas orientierungslos aus. Kann ich Ihnen den Weg zeigen?',
      it: 'Ciao! Sembri un po’ perso con quella mappa. Serve aiuto per trovare qualcosa?',
      pt: 'Olá! Você parece meio perdido com esse mapa. Precisa de ayuda para achar algum lugar?',
      en: 'Hey there! You look a bit lost with that map. Need a hand finding somewhere?',
      sr: 'Fa waka! Yu e luku leki yu lassi trassi tapu a kaarti. Yu abi yepi fu feni wan presi?'
    },
    keyVocabulary: [
      { word: 'A la derecha', phonetic: 'ah lah deh-REH-chah', translation: 'To the right' },
      { word: 'A la izquierda', phonetic: 'ah lah eeth-KYER-dah', translation: 'To the left' },
      { word: 'Siga todo recto', phonetic: 'SEE-gah TOH-doh REK-toh', translation: 'Go straight ahead' },
      { word: 'La estación de metro', phonetic: 'lah es-tah-THYON deh MEH-troh', translation: 'The subway station' }
    ],
    commonPhrases: [
      { phrase: 'Disculpe, ¿dónde está el museo de arte?', translation: 'Excuse me, where is the art museum?', audioText: 'Disculpe, ¿dónde está el museo de arte?' },
      { phrase: '¿Está lejos de aquí o se puede ir caminando?', translation: 'Is it far or can I walk there?', audioText: '¿Está lejos de aquí o se puede ir caminando?' },
      { phrase: '¿Cuántos minutos se tarda a pie?', translation: 'How many minutes does it take on foot?', audioText: '¿Cuántos minutos se tarda a pie?' }
    ],
    dialogueFlow: [
      { stepTitle: '1. Ask Destination', partnerPrompt: 'Hi! Need help finding a landmark?', suggestedUserResponses: ['Disculpe, ¿cómo llego a la estación central?', 'Busco el museo de arte, ¿está cerca?'] },
      { stepTitle: '2. Clarify Route', partnerPrompt: 'Walk straight 2 blocks, then turn left at the pharmacy.', suggestedUserResponses: ['¿ Giro a la izquierda después de la farmacia?', '¿Está al lado del parque?'] },
      { stepTitle: '3. Thank & Confirm', partnerPrompt: 'Yes, exactly! You can’t miss it.', suggestedUserResponses: ['Muchas gracias por su amabilidad.', '¡Que tenga un excelente día!'] }
    ],
    cultureTip: 'In many countries, people appreciate starting with "Disculpe" (Excuse me) before launching into a direction question.'
  },
  {
    id: 'market_shopping',
    title: 'Bargaining at a Local Street Market',
    description: 'Shop for fresh fruits, artisanal crafts, inquire about prices by weight, and negotiate politely.',
    category: 'daily',
    partnerRole: 'Vendor at a vibrant local farmers market',
    userRole: 'Shopper looking for fresh ingredients & souvenirs',
    location: 'Central Market Square',
    difficulty: 'A2',
    icon: 'ShoppingBag',
    color: 'from-amber-600 to-yellow-600',
    initialGreeting: {
      es: '¡Pase, pase! Fruta fresquita y artesanías. ¿Qué se le ofrece hoy, marchante?',
      fr: 'Bonjour ! Produits frais du terroir et artisanat. Que puis-je vous servir aujourd’hui ?',
      de: 'Guten Tag! Frisches Obst und regionale Spezialitäten. Was darf es sein?',
      it: 'Prego! Frutta fresca e artigianato locale. Cosa posso offrirle oggi?',
      pt: 'Olha a fruta fresquinha! O que vai levar hoje?',
      en: 'Step right up! Fresh fruits and handmade crafts. What can I get for you today?',
      sr: 'Kon insei! Nyun froktu nanga bow sani. San yu e suku tide, mi mati?'
    },
    keyVocabulary: [
      { word: '¿Cuánto cuesta esto?', phonetic: 'KWAN-toh KWES-tah ES-toh', translation: 'How much does this cost?' },
      { word: 'Un kilo de mangos', phonetic: 'oon KEE-loh deh MAN-gos', translation: 'A kilo of mangoes' },
      { word: 'Está muy fresco', phonetic: 'es-TAH mwee FRES-koh', translation: 'It is very fresh' },
      { word: 'Un descuento', phonetic: 'oon des-KWEN-toh', translation: 'A discount' }
    ],
    commonPhrases: [
      { phrase: '¿A cómo está el kilo de fresas?', translation: 'How much is a kilo of strawberries?', audioText: '¿A cómo está el kilo de fresas?' },
      { phrase: 'Deme medio kilo, por favor.', translation: 'Give me half a kilo, please.', audioText: 'Deme medio kilo, por favor.' },
      { phrase: '¿Me hace un descuento si llevo dos kilos?', translation: 'Will you give me a discount if I buy two kilos?', audioText: '¿Me hace un descuento si llevo dos kilos?' }
    ],
    dialogueFlow: [
      { stepTitle: '1. Inquire Price', partnerPrompt: 'Everything is freshly picked today!', suggestedUserResponses: ['¿Cuánto cuesta el kilo de manzanas?', 'Se ve delicioso, ¿a cómo está esto?'] },
      { stepTitle: '2. Specify Quantity', partnerPrompt: 'It is $3 per kilo. How much would you like?', suggestedUserResponses: ['Deme un kilo y medio, por favor.', 'Póngame medio kilo de fresas también.'] },
      { stepTitle: '3. Payment & Farewells', partnerPrompt: 'That comes to $5 in total. Anything else?', suggestedUserResponses: ['Está bien, aquí tiene. ¡Gracias!', '¿Me puede dar una bolsa, por favor?'] }
    ],
    cultureTip: 'In street markets in Mexico, Spain, and South America, vendors love friendly banter and calling customers terms like "marchante" or "amigo".'
  },
  {
    id: 'pharmacy_visit',
    title: 'Pharmacy & Health Consultation',
    description: 'Describe minor ailments like headache, fever, or stomachache to a helpful pharmacist.',
    category: 'health',
    partnerRole: 'Pharmacist at a local apothecary',
    userRole: 'Patient seeking over-the-counter medicine',
    location: 'City Pharmacy',
    difficulty: 'B1',
    icon: 'Stethoscope',
    color: 'from-rose-500 to-red-600',
    initialGreeting: {
      es: 'Buenos días. Bienvenido a la farmacia. ¿En qué puedo ayudarle hoy?',
      fr: 'Bonjour. Bienvenue à la pharmacie. Comment puis-je vous aider aujourd’hui ?',
      de: 'Guten Tag! Willkommen in der Apotheke. Wie kann ich Ihnen helfen?',
      it: 'Buongiorno. Benvenuto in farmacia. Come posso aiutarla oggi?',
      pt: 'Bom dia! Bem-vindo à farmácia. Como posso ajudar?',
      en: 'Good morning! Welcome to the pharmacy. How can I assist you today?',
      sr: 'Bun mamanten! Switi kon na a dresi-oso. Fa mi kan yepi yu tide?'
    },
    keyVocabulary: [
      { word: 'Me duele la cabeza', phonetic: 'meh DWEH-leh lah kah-BEH-thah', translation: 'My head hurts' },
      { word: 'Tengo fiebre', phonetic: 'TEN-goh FYEH-breh', translation: 'I have a fever' },
      { word: 'Un jarabe para la tos', phonetic: 'oon hah-RAH-beh PAH-rah lah tos', translation: 'Cough syrup' },
      { word: 'Cada ocho horas', phonetic: 'KAH-dah OH-choh OH-rahs', translation: 'Every eight hours' }
    ],
    commonPhrases: [
      { phrase: 'Me siento un poco mal desde ayer.', translation: 'I have been feeling unwell since yesterday.', audioText: 'Me siento un poco mal desde ayer.' },
      { phrase: '¿Tiene algo para el dolor de garganta?', translation: 'Do you have something for a sore throat?', audioText: '¿Tiene algo para el dolor de garganta?' },
      { phrase: '¿Necesita receta médica para esto?', translation: 'Do I need a prescription for this?', audioText: '¿Necesita receta médica para esto?' }
    ],
    dialogueFlow: [
      { stepTitle: '1. Describe Symptoms', partnerPrompt: 'What symptoms are you experiencing?', suggestedUserResponses: ['Me duele la cabeza y la garganta.', 'Tengo dolor de estómago y náuseas.'] },
      { stepTitle: '2. Dosage Instructions', partnerPrompt: 'I recommend this syrup. Take 1 spoon every 8 hours.', suggestedUserResponses: ['¿Debo tomarlo antes o después de comer?', '¿Tiene algún efecto secundario?'] },
      { stepTitle: '3. Purchase & Gratitude', partnerPrompt: 'Take it with plenty of water. Get well soon!', suggestedUserResponses: ['Muchas gracias por la recomendación.', '¿Cuánto debo pagar?'] }
    ],
    cultureTip: 'Pharmacists in Europe and Latin America often act as first-line medical advisers for minor ailments before visiting a hospital.'
  },
  {
    id: 'restaurant_dining',
    title: 'Dinner at a Fine Restaurant',
    description: 'Reserve a table, inquire about daily specials, ask about food allergies, and order wine.',
    category: 'dining',
    partnerRole: 'Head Waiter at an authentic bistro',
    userRole: 'Diner celebrating an evening with friends',
    location: 'Le Gourmet Restaurant',
    difficulty: 'B1',
    icon: 'Utensils',
    color: 'from-amber-600 to-red-700',
    initialGreeting: {
      es: 'Buenas noches. Bienvenidos a Restaurante El Olivo. ¿Tienen reservación?',
      fr: 'Bonsoir et bienvenue au Bistro Gourmet. Avez-vous une réservation ?',
      de: 'Guten Abend! Willkommen im Restaurant Olivo. Haben Sie reserviert?',
      it: 'Buonasera e benvenuti al Ristorante Olivo. Avete prenotato?',
      pt: 'Boa noite! Bem-vindos ao Restaurante Olivo. Têm reserva?',
      en: 'Good evening! Welcome to El Olivo Restaurant. Do you have a table reserved?',
      sr: 'Bun neti! Switi kon na Restaurante El Olivo. Yu abi wan reserfering?'
    },
    keyVocabulary: [
      { word: 'La recomendación del chef', phonetic: 'lah reh-koh-men-dah-THYON del chef', translation: 'Chef’s recommendation' },
      { word: 'Soy alérgico a los mariscos', phonetic: 'soy ah-LER-hee-koh ah los mah-REES-kos', translation: 'I am allergic to shellfish' },
      { word: 'Plato principal', phonetic: 'PLAH-toh preen-thee-PAL', translation: 'Main course' },
      { word: 'Una copa de vino tinto', phonetic: 'oo-nah KOH-pah deh VEE-noh TEEN-toh', translation: 'A glass of red wine' }
    ],
    commonPhrases: [
      { phrase: '¿Cuál es el plato del día?', translation: 'What is the dish of the day?', audioText: '¿Cuál es el plato del día?' },
      { phrase: '¿Tienen opciones vegetarianas?', translation: 'Do you have vegetarian options?', audioText: '¿Tienen opciones vegetarianas?' },
      { phrase: 'Estaba delicioso, felicitaciones al chef.', translation: 'It was delicious, compliments to the chef.', audioText: 'Estaba delicioso, felicitaciones al chef.' }
    ],
    dialogueFlow: [
      { stepTitle: '1. Seating & Drinks', partnerPrompt: 'Right this way! Here are the menus. Can I offer you wine or water?', suggestedUserResponses: ['Una botella de agua con gas, por favor.', 'Una copa de vino tinto de la casa.'] },
      { stepTitle: '2. Ordering Food', partnerPrompt: 'Are you ready to order your main course?', suggestedUserResponses: ['¿Cuál es la especialidad de la casa?', 'Quisiera el pescado a la parrilla, por favor.'] },
      { stepTitle: '3. Dessert & Check', partnerPrompt: 'Would you like dessert or coffee before the check?', suggestedUserResponses: ['Traiga la cuenta cuando pueda, por favor.', 'Solo un café expreso para terminar.'] }
    ],
    cultureTip: 'In Spain and France, dining is a relaxed experience. The waiter will never rush you or bring the bill until you explicitly ask for "La cuenta".'
  },
  {
    id: 'casual_friendship',
    title: 'Making a New Friend at a Park',
    description: 'Chat about hobbies, weekend plans, favorite travel spots, and life in the city.',
    category: 'social',
    partnerRole: 'Friendly local sharing an interest in arts and travel',
    userRole: 'New resident eager to practice language & make friends',
    location: 'Sunlit Botanical Park',
    difficulty: 'B1',
    icon: 'Users',
    color: 'from-purple-500 to-indigo-600',
    initialGreeting: {
      es: '¡Hola! Qué día tan hermoso hace en el parque hoy. ¿Sueles venir a pasear por aquí a menudo?',
      fr: 'Bonjour ! Quelle belle journée dans ce parc. Vous venez souvent vous promener ici ?',
      de: 'Hallo! Was für ein schöner Tag im Park. Kommen Sie oft hierher zum Spazierengehen?',
      it: 'Ciao! Che bella giornata oggi al parco. Vieni spesso a fare una passeggiata qui?',
      pt: 'Olá! Que dia lindo no parque. Você costuma caminhar por aqui com frequência?',
      en: 'Hey! It’s such a gorgeous day in the park. Do you come here often to hang out?',
      sr: 'Fa waka! A dey e skin krin so dyaso na park. Yu e kon waka dya furu tron?'
    },
    keyVocabulary: [
      { word: 'Mis pasatiempos', phonetic: 'mees pah-sah-TYEM-pos', translation: 'My hobbies' },
      { word: 'El fin de semana', phonetic: 'el feen deh seh-MAH-nah', translation: 'The weekend' },
      { word: 'Me encanta viajar', phonetic: 'meh en-KAN-tah vyah-HAR', translation: 'I love to travel' },
      { word: 'Tomar un café juntos', phonetic: 'toh-MAR oon kah-FEH HOON-tos', translation: 'Grab a coffee together' }
    ],
    commonPhrases: [
      { phrase: 'Llegué a esta ciudad hace dos meses.', translation: 'I arrived in this city two months ago.', audioText: 'Llegué a esta ciudad hace dos meses.' },
      { phrase: '¿Qué te gusta hacer en tu tiempo libre?', translation: 'What do you like doing in your free time?', audioText: '¿Qué te gusta hacer en tu tiempo libre?' },
      { phrase: 'Podríamos intercambiar números para quedar otro día.', translation: 'We could exchange numbers to meet up another day.', audioText: 'Podríamos intercambiar números para quedar otro día.' }
    ],
    dialogueFlow: [
      { stepTitle: '1. Break the Ice', partnerPrompt: 'It really is lovely weather! Have you lived in the city long?', suggestedUserResponses: ['Soy nuevo aquí, vine para aprender el idioma.', 'Vengo al parque los fines de semana a leer.'] },
      { stepTitle: '2. Shared Hobbies', partnerPrompt: 'That’s awesome! What hobbies do you enjoy most?', suggestedUserResponses: ['Me apasiona la fotografía y el senderismo.', 'Me encanta cocinar platos de diferentes países.'] },
      { stepTitle: '3. Stay in Touch', partnerPrompt: 'We should grab a coffee sometime!', suggestedUserResponses: ['¡Me encantaría! Apunta mi número.', 'Excelente idea, hablemos el fin de semana.'] }
    ],
    cultureTip: 'Making casual conversation with strangers in parks or coffee shops is very common in western countries; keep a warm smile and light conversational topics.'
  },
  {
    id: 'apartment_rental',
    title: 'Apartment Hunting & Lease Inquiry',
    description: 'Inquire about a flat for rent, monthly utilities, deposit terms, and nearby public transit.',
    category: 'daily',
    partnerRole: 'Property Manager showing a 1-bedroom flat',
    userRole: 'Prospective tenant looking for an apartment',
    location: 'Modern Apartment Viewings',
    difficulty: 'B2',
    icon: 'Home',
    color: 'from-blue-600 to-indigo-700',
    initialGreeting: {
      es: 'Buenas tardes. Gracias por venir a ver el apartamento. ¿Qué le parece la iluminación del salón?',
      fr: 'Bonjour et bienvenue pour la visite du logement. Comment trouvez-vous la luminosité ?',
      de: 'Guten Tag! Willkommen zur Wohnungsbesichtigung. Wie gefällt Ihnen das Wohnzimmer?',
      it: 'Buonasera! Benvenuto per la visita dell’appartamento. Come le sembra il soggiorno?',
      pt: 'Boa tarde! Bem-vindo à visita do apartamento. O que achou da sala?',
      en: 'Good afternoon! Thanks for coming to view the apartment. How do you like the natural light in the living room?',
      sr: 'Bun bakadina! Gran tangi fu kon luku a oso. Fa yu e feni a faya na ini a libi-kamra?'
    },
    keyVocabulary: [
      { word: 'El alquiler mensual', phonetic: 'el al-kee-LER men-SWAL', translation: 'Monthly rent' },
      { word: 'Los gastos de servicios', phonetic: 'los GAS-tos deh ser-VEE-thyos', translation: 'Utility expenses' },
      { word: 'El depósito de garantía', phonetic: 'el deh-POH-see-toh deh gah-ran-TEE-ah', translation: 'Security deposit' },
      { word: 'Contrato de un año', phonetic: 'kon-TRAH-toh deh oon AH-nyoh', translation: 'One year contract' }
    ],
    commonPhrases: [
      { phrase: '¿Los servicios de agua y luz están incluidos?', translation: 'Are water and electricity utilities included?', audioText: '¿Los servicios de agua y luz están incluidos?' },
      { phrase: '¿Cuándo estaría disponible para mudarse?', translation: 'When would it be available to move in?', audioText: '¿Cuándo estaría disponible para mudarse?' },
      { phrase: '¿Se permiten mascotas en la propiedad?', translation: 'Are pets allowed in the property?', audioText: '¿Se permiten mascotas en la propiedad?' }
    ],
    dialogueFlow: [
      { stepTitle: '1. First Impressions', partnerPrompt: 'The apartment is fully furnished. What do you think?', suggestedUserResponses: ['El espacio es amplio y muy luminoso.', '¿Cuál es el precio del alquiler mensual?'] },
      { stepTitle: '2. Lease & Utilities', partnerPrompt: 'Rent is $900/month plus 2 months deposit. Utilities are separate.', suggestedUserResponses: ['¿Los gastos de Internet y agua vienen incluidos?', '¿El contrato mínimo es de un año?'] },
      { stepTitle: '3. Application Next Steps', partnerPrompt: 'Yes, 1 year contract. If interested, I can send the application form.', suggestedUserResponses: ['Me interesa mucho, por favor envíeme los documentos.', 'Lo consultaré hoy y le aviso mañana.'] }
    ],
    cultureTip: 'Rental terms vary: in Germany you often bring your own kitchen (Einbauküche), while in Spain and France furnished apartments (amueblado / meublé) are common.'
  },
  {
    id: 'job_interview',
    title: 'Job Interview for Global Firm',
    description: 'Discuss your work experience, problem-solving skills, strengths, and career ambitions.',
    category: 'business',
    partnerRole: 'Senior Talent Acquisition Manager',
    userRole: 'Applicant interviewing for a specialist position',
    location: 'Corporate Virtual Office',
    difficulty: 'B2',
    icon: 'Briefcase',
    color: 'from-rose-500 to-pink-600',
    initialGreeting: {
      es: 'Buenos días. Gracias por asistir a esta entrevista. Para comenzar, ¿podrías hablarme un poco de tu trayectoria profesional?',
      fr: 'Bonjour et bienvenue à cet entretien. Pour commencer, pouvez-vous me parler un peu de votre parcours ?',
      de: 'Guten Tag. Vielen Dank für das Gespräch. Könnten Sie sich bitte kurz vorstellen und Ihren Werdegang beschreiben?',
      it: 'Buongiorno e benvenuto. Per iniziare, vorresti raccontarmi qualcosa sul tuo percorso professionale?',
      pt: 'Bom dia! Obrigado por participar desta entrevista. Para começar, você poderia me falar um pouco sobre sua trajetória profissional?',
      en: 'Good morning! Thank you for meeting with me today. To get started, could you briefly introduce yourself and share your background?',
      sr: 'Bun mamanten! Gran tangi fu kon na a wroko-interview dyaso. Yu kan taki pikinso fu yu wroko-ondrofeni?'
    },
    keyVocabulary: [
      { word: 'Mi experiencia laboral', phonetic: 'mee ex-peh-RYEN-thyah lah-boh-RAL', translation: 'My work experience' },
      { word: 'Trabajo en equipo', phonetic: 'trah-BAH-ho en eh-KEE-poh', translation: 'Teamwork' },
      { word: 'Resolución de problemas', phonetic: 'reh-soh-loo-THYON deh proh-BLEH-mas', translation: 'Problem solving' },
      { word: 'Proyectos destacados', phonetic: 'proh-YEK-tos des-tah-KAH-dos', translation: 'Key projects' }
    ],
    commonPhrases: [
      { phrase: 'He trabajado durante 4 años gestionando proyectos digitales.', translation: 'I have worked for 4 years managing digital projects.', audioText: 'He trabajado durante 4 años gestionando proyectos digitales.' },
      { phrase: 'Mi mayor fortaleza es mi capacidad de adaptación.', translation: 'My greatest strength is my adaptability.', audioText: 'Mi mayor fortaleza es mi capacidad de adaptación.' },
      { phrase: '¿Cuáles son los próximos pasos en el proceso de selección?', translation: 'What are the next steps in the hiring process?', audioText: '¿Cuáles son los próximos pasos en el proceso de selección?' }
    ],
    dialogueFlow: [
      { stepTitle: '1. Professional Intro', partnerPrompt: 'Tell me about your career experience.', suggestedUserResponses: ['Tengo más de cinco años de experiencia en tecnología.', 'He liderado equipos multidisciplinarios con éxito.'] },
      { stepTitle: '2. Challenges & Strengths', partnerPrompt: 'Can you describe a challenge you overcame at work?', suggestedUserResponses: ['Enfrentamos un plazo ajustado y reorganizamos las prioridades.', 'Mi fortaleza es resolver problemas bajo presión.'] },
      { stepTitle: '3. Questions for Interviewer', partnerPrompt: 'Do you have any questions for us about the company culture?', suggestedUserResponses: ['¿Cómo es el ambiente de trabajo en el equipo?', '¿Cuáles son las oportunidades de crecimiento?'] }
    ],
    cultureTip: 'In job interviews, maintain polite formal address (Usted in Spanish, Vous in French, Keigo in Japanese) unless invited to use casual form.'
  },
  {
    id: 'train_station',
    title: 'Train Station Ticket Booking',
    description: 'Purchase express train tickets, inquire about seat reservations, platform numbers & delays.',
    category: 'travel',
    partnerRole: 'Rail Station Ticket Agent',
    userRole: 'Traveler journeying to a neighbor city',
    location: 'Central Rail Terminal',
    difficulty: 'A2',
    icon: 'TrainTrack',
    color: 'from-cyan-600 to-blue-700',
    initialGreeting: {
      es: 'Buenos días. Bienvenido a la taquilla de trenes. ¿A qué destino viaja hoy?',
      fr: 'Bonjour ! Bienvenue au guichet de la gare. Quelle est votre destination ?',
      de: 'Guten Tag! Willkommen am Fahrkartenschalter. Wohin möchten Sie reisen?',
      it: 'Buongiorno! Benvenuto alla biglietteria. Per quale destinazione viaggia oggi?',
      pt: 'Bom dia! Bem-vindo à bilheteria. Para onde vai viajar hoje?',
      en: 'Good morning! Welcome to the train station ticket window. Where are you traveling today?',
      sr: 'Bun mamanten! Switi kon na a treinkassa. Na sortu presi yu e go tide?'
    },
    keyVocabulary: [
      { word: 'Un billete de ida y vuelta', phonetic: 'oon bee-LYEH-teh deh EE-dah ee VWEL-tah', translation: 'A round-trip ticket' },
      { word: 'El andén número cuatro', phonetic: 'el an-DEN NOO-meh-roh KWAH-troh', translation: 'Platform number four' },
      { word: 'Asiento al lado de la ventana', phonetic: 'ah-SYEN-toh al LAH-doh deh lah ven-TAH-nah', translation: 'Window seat' },
      { word: '¿Lleva retraso el tren?', phonetic: 'yeh-vah reh-TRAH-soh el tren', translation: 'Is the train delayed?' }
    ],
    commonPhrases: [
      { phrase: 'Quisiera un billete para el próximo tren a Barcelona.', translation: 'I would like a ticket for the next train to Barcelona.', audioText: 'Quisiera un billete para el próximo tren a Barcelona.' },
      { phrase: '¿De qué andén sale el tren?', translation: 'Which platform does the train depart from?', audioText: '¿De qué andén sale el tren?' },
      { phrase: '¿Hay descuento para estudiantes?', translation: 'Is there a student discount?', audioText: '¿Hay descuento para estudiantes?' }
    ],
    dialogueFlow: [
      { stepTitle: '1. Select Destination & Time', partnerPrompt: 'Where are you headed?', suggestedUserResponses: ['Quisiera dos billetes para el tren rápido a Madrid.', 'Un billete de ida y vuelta a Valencia, por favor.'] },
      { stepTitle: '2. Seat Preference', partnerPrompt: 'Direct train departs in 20 mins. Window or aisle seat?', suggestedUserResponses: ['Prefiero asiento en la ventana, por favor.', 'Un asiento cerca del pasillo, gracias.'] },
      { stepTitle: '3. Platform Info', partnerPrompt: 'Here are your tickets. Train departs from platform 3.', suggestedUserResponses: ['¿De qué andén sale el tren?', 'Muchas gracias, ¡buen día!'] }
    ],
    cultureTip: 'Always check if your physical ticket needs to be validated (compostage in France or timbratura in Italy) at green/yellow stamps before boarding!'
  },
  {
    id: 'culture_dinner',
    title: 'Cultural Dinner & Etiquette Chat',
    description: 'Share a meal at a local host’s home, compliment the cooking, and discuss holiday traditions.',
    category: 'culture',
    partnerRole: 'Gracious local dinner host',
    userRole: 'Guest invited for a traditional homemade feast',
    location: 'Cozy Dining Room',
    difficulty: 'B1',
    icon: 'HeartHandshake',
    color: 'from-amber-600 to-emerald-700',
    initialGreeting: {
      es: '¡Pasa, pasa! ¡Bienvenido a nuestra casa! Nos alegra mucho tenerte cenando con nosotros esta noche.',
      fr: 'Bienvenue chez nous ! Nous sommes ravis de vous accueillir pour le dîner ce soir.',
      de: 'Herzlich willkommen bei uns zu Hause! Schön, dass du heute zum Abendessen da bist.',
      it: 'Benvenuto a casa nostra! Siamo felicissimi di averti a cena con noi stasera.',
      pt: 'Seja muito bem-vindo à nossa casa! Estamos felizes em ter você para o jantar.',
      en: 'Come on in! Welcome to our home. We are so thrilled to have you join us for dinner tonight!',
      sr: 'Kon insei! Switi odi na ini wi oso! Wi e prisiri srefi srefi fu abi yu leki kompe na wi tafra tide neti.'
    },
    keyVocabulary: [
      { word: '¡Está riquísimo!', phonetic: 'es-TAH ree-KEE-see-moh', translation: 'It is delicious!' },
      { word: 'Muchas gracias por la invitación', phonetic: 'MOO-chas GRAH-thyas por lah in-vee-tah-THYON', translation: 'Thank you so much for the invitation' },
      { word: 'Plato tradicional', phonetic: 'PLAH-toh trah-dee-thyoh-NAL', translation: 'Traditional dish' },
      { word: '¡Buen provecho!', phonetic: 'bwen proh-VEH-choh', translation: 'Bon appétit / Enjoy your meal!' }
    ],
    commonPhrases: [
      { phrase: 'Gracias por recibirme en su hogar.', translation: 'Thank you for welcoming me to your home.', audioText: 'Gracias por recibirme en su hogar.' },
      { phrase: '¿Cuál es el secreto de esta receta?', translation: 'What is the secret to this recipe?', audioText: '¿Cuál es el secreto de esta receta?' },
      { phrase: '¡Salud a todos!', translation: 'Cheers to everyone!', audioText: '¡Salud a todos!' }
    ],
    dialogueFlow: [
      { stepTitle: '1. Arrive & Present Gift', partnerPrompt: 'Welcome! Make yourself at home in the living room.', suggestedUserResponses: ['Traje este pequeño detalle para ustedes.', 'Tienen una casa maravillosa, gracias por invitarme.'] },
      { stepTitle: '2. Enjoy the Meal', partnerPrompt: 'Here is our regional paella/specialty. Enjoy your meal!', suggestedUserResponses: ['¡Buen provecho! Se ve sensacional.', '¡Está verdaderamente riquísimo!'] },
      { stepTitle: '3. Cultural Sharing', partnerPrompt: 'Do you have similar holiday dishes in your country?', suggestedUserResponses: ['En mi país comemos algo parecido durante las fiestas.', 'Nos encanta reunir a la familia a cenar también.'] }
    ],
    cultureTip: 'Bringing a small host gift (like flowers, chocolates, or a bottle of wine) when visiting someone’s home is universal etiquette in almost every culture.'
  },
  {
    id: 'free_talk',
    title: 'Open Free-Form Practice',
    description: 'Talk freely about any topic under the sun! Your patient AI partner adapts fluidly.',
    category: 'freeform',
    partnerRole: 'Patient and articulate Native Language Tutor',
    userRole: 'Language Learner practicing natural conversation',
    location: 'Virtual Coffee Lounge',
    difficulty: 'A1',
    icon: 'MessageSquare',
    color: 'from-violet-500 to-purple-600',
    initialGreeting: {
      es: '¡Hola! Estoy listo para conversar de lo que quieras. ¿De qué te gustaría hablar hoy?',
      fr: 'Bonjour ! Je suis prêt à discuter de tout sujet qui vous intéresse. De quoi aimeriez-vous parler aujourd’hui ?',
      de: 'Hallo! Ich bin bereit, über jedes Thema zu sprechen, das dich interessiert. Worüber möchtest du heute sprechen?',
      it: 'Ciao! Sono pronto a parlare di qualsiasi argomento tu voglia. Di cosa vorresti chiacchierare oggi?',
      pt: 'Olá! Estou pronto para conversar sobre qualquer assunto que você quiser. Sobre o que gostaria de falar hoje?',
      en: 'Hello! I am ready to chat about anything you like. What topic shall we explore today?',
      sr: 'Fa waka! Mi de klari fu taki fu san yu wani. Sortu tori yu sa wani taki fu en tide?'
    },
    keyVocabulary: [
      { word: 'En mi opinión', phonetic: 'en mee oh-pee-NYON', translation: 'In my opinion' },
      { word: '¿Qué opinas tú?', phonetic: 'keh oh-PEE-nas too', translation: 'What do you think?' },
      { word: 'Cultura y música', phonetic: 'kool-TOO-rah ee MOO-see-kah', translation: 'Culture and music' },
      { word: 'Aprender idiomas', phonetic: 'ah-pren-DER ee-DYOH-mas', translation: 'Learning languages' }
    ],
    commonPhrases: [
      { phrase: 'Me gustaría hablar sobre la música local.', translation: 'I would like to talk about local music.', audioText: 'Me gustaría hablar sobre la música local.' },
      { phrase: '¿Podrías corregirme si cometo errores?', translation: 'Could you correct me if I make mistakes?', audioText: '¿Podrías corregirme si cometo errores?' },
      { phrase: '¿Cómo se dice esta palabra en tu idioma?', translation: 'How do you say this word in your language?', audioText: '¿Cómo se dice esta palabra en tu idioma?' }
    ],
    dialogueFlow: [
      { stepTitle: '1. Topic Selection', partnerPrompt: 'What topic shall we explore today?', suggestedUserResponses: ['Hablemos sobre viajes y culturas.', 'Me gustaría practicar cómo hablar de mis aficiones.'] },
      { stepTitle: '2. Deepen Conversation', partnerPrompt: 'Fascinating topic! Why does that interest you?', suggestedUserResponses: ['Porque me ayuda a comprender el mundo.', 'Porque planeo viajar el próximo año.'] },
      { stepTitle: '3. Wrap-up Feedback', partnerPrompt: 'You expressed your thoughts clearly! Any questions?', suggestedUserResponses: ['¿Qué palabras debería mejorar?', '¡Muchas gracias por la excelente lección!'] }
    ],
    cultureTip: 'Don’t worry about perfection! Free-form practice builds conversational rhythm and confidence.'
  }
];
