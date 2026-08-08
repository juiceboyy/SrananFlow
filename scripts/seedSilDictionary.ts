import fs from 'fs';
import path from 'path';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';
import { RAGCorpusItem } from '../src/types';
import firebaseAppletConfig from '../firebase-applet-config.json';

export async function seedSilDictionaryToFirestore() {
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'silDictionaryCorpus.json');
  if (!fs.existsSync(jsonPath)) {
    console.error(`File not found: ${jsonPath}. Run parseSilDictionary.ts first.`);
    return;
  }

  const rawData = fs.readFileSync(jsonPath, 'utf-8');
  const items: RAGCorpusItem[] = JSON.parse(rawData);
  console.log(`Read ${items.length} items from silDictionaryCorpus.json.`);

  const config = firebaseAppletConfig;
  if (!config || !config.projectId) {
    console.error('Invalid Firebase Applet config.');
    return;
  }

  const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId
  };

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  const dbId = config.firestoreDatabaseId || '(default)';
  const db = getFirestore(app, dbId);
  console.log(`Connecting to Cloud Firestore database: ${dbId} (project: ${config.projectId})`);

  const COLLECTION_NAME = 'ragCorpus';
  const BATCH_SIZE = 450; // Firestore batch max is 500
  let uploaded = 0;

  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const chunk = items.slice(i, i + BATCH_SIZE);
    const batch = writeBatch(db);

    chunk.forEach((item) => {
      const docRef = doc(db, COLLECTION_NAME, item.id);
      batch.set(docRef, item, { merge: true });
    });

    await batch.commit();
    uploaded += chunk.length;
    console.log(`[Firestore Seeder] Seeded ${uploaded}/${items.length} dictionary entries...`);
  }

  console.log(`[Firestore Seeder] Successfully seeded all ${uploaded} SIL Dictionary entries into 'ragCorpus'!`);
}

seedSilDictionaryToFirestore().catch((err) => {
  console.error('Error seeding Firestore:', err);
});
