import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { RAGCorpusItem } from '../types';
import { DEFAULT_SRANAN_CORPUS } from '../data/defaultCorpus';

let db: ReturnType<typeof getFirestore> | null = null;

export function getFirestoreDB() {
  if (db) return db;

  try {
    const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
    if (fs.existsSync(configPath)) {
      const rawConfig = fs.readFileSync(configPath, 'utf-8');
      const config = JSON.parse(rawConfig);
      
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
      
      db = getFirestore(app, dbId);
      console.log('Successfully connected to Cloud Firestore database:', dbId);
    } else {
      console.warn('firebase-applet-config.json not found. Using in-memory store.');
    }
  } catch (err) {
    console.error('Failed to initialize Firebase Firestore:', err);
  }

  return db;
}

const COLLECTION_NAME = 'ragCorpus';

/**
 * Load all items from Firestore. If Firestore is empty on first run, seed with DEFAULT_SRANAN_CORPUS.
 */
export async function loadCorpusFromFirestore(): Promise<RAGCorpusItem[]> {
  const firestore = getFirestoreDB();
  if (!firestore) return [...DEFAULT_SRANAN_CORPUS];

  try {
    const colRef = collection(firestore, COLLECTION_NAME);
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
      console.log('Firestore RAG Corpus collection is empty. Seeding default Sranantongo corpus...');
      await seedDefaultCorpus(firestore);
      return [...DEFAULT_SRANAN_CORPUS];
    }

    const items: RAGCorpusItem[] = [];
    snapshot.forEach((document) => {
      const data = document.data() as RAGCorpusItem;
      items.push({
        ...data,
        id: data.id || document.id
      });
    });

    console.log(`Loaded ${items.length} RAG Corpus items from Cloud Firestore.`);
    return items;
  } catch (err) {
    console.error('Error reading from Firestore, falling back to local dataset:', err);
    return [...DEFAULT_SRANAN_CORPUS];
  }
}

/**
 * Save single or array of items to Firestore
 */
export async function saveCorpusItemsToFirestore(items: RAGCorpusItem[]): Promise<boolean> {
  const firestore = getFirestoreDB();
  if (!firestore) return false;

  try {
    const batch = writeBatch(firestore);
    items.forEach((item) => {
      const docRef = doc(firestore, COLLECTION_NAME, item.id);
      batch.set(docRef, item, { merge: true });
    });
    await batch.commit();
    return true;
  } catch (err) {
    console.error('Error writing batch to Firestore:', err);
    return false;
  }
}

/**
 * Delete item from Firestore
 */
export async function deleteCorpusItemFromFirestore(id: string): Promise<boolean> {
  const firestore = getFirestoreDB();
  if (!firestore) return false;

  try {
    const docRef = doc(firestore, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error('Error deleting document from Firestore:', err);
    return false;
  }
}

/**
 * Delete batch of items from Firestore
 */
export async function deleteBatchCorpusItemsFromFirestore(ids: string[]): Promise<boolean> {
  const firestore = getFirestoreDB();
  if (!firestore || !ids || ids.length === 0) return false;

  try {
    const batch = writeBatch(firestore);
    ids.forEach((id) => {
      const docRef = doc(firestore, COLLECTION_NAME, id);
      batch.delete(docRef);
    });
    await batch.commit();
    return true;
  } catch (err) {
    console.error('Error deleting batch of documents from Firestore:', err);
    return false;
  }
}

/**
 * Reset Firestore collection to default dataset
 */
export async function resetFirestoreCorpusToDefault(): Promise<boolean> {
  const firestore = getFirestoreDB();
  if (!firestore) return false;

  try {
    // Delete existing documents
    const colRef = collection(firestore, COLLECTION_NAME);
    const snapshot = await getDocs(colRef);
    const deleteBatch = writeBatch(firestore);
    snapshot.forEach((d) => deleteBatch.delete(d.ref));
    await deleteBatch.commit();

    // Seed defaults
    await seedDefaultCorpus(firestore);
    return true;
  } catch (err) {
    console.error('Error resetting Firestore corpus:', err);
    return false;
  }
}

async function seedDefaultCorpus(firestore: ReturnType<typeof getFirestore>) {
  const batch = writeBatch(firestore);
  DEFAULT_SRANAN_CORPUS.forEach((item) => {
    const docRef = doc(firestore, COLLECTION_NAME, item.id);
    batch.set(docRef, item);
  });
  await batch.commit();
  console.log('Seeded Cloud Firestore with authentic Sranantongo corpus items.');
}
