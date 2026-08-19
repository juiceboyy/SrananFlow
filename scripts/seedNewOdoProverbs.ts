import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';
import { CURATED_ODO_PROVERBS } from '../src/data/corpus/proverbs';
import firebaseAppletConfig from '../firebase-applet-config.json';

async function seedOdoProverbs() {
  console.log(`Seeding ${CURATED_ODO_PROVERBS.length} Odo proverbs to Cloud Firestore...`);

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

  const COLLECTION_NAME = 'ragCorpus';
  const batch = writeBatch(db);

  CURATED_ODO_PROVERBS.forEach((item) => {
    const docRef = doc(db, COLLECTION_NAME, item.id);
    batch.set(docRef, item, { merge: true });
  });

  await batch.commit();
  console.log(`Successfully seeded ${CURATED_ODO_PROVERBS.length} Odo proverbs into Firestore 'ragCorpus'!`);
}

seedOdoProverbs()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Failed to seed Firestore:', err);
    process.exit(1);
  });
