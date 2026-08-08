import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { RAGCorpusItem } from '../types';
import { DEFAULT_SRANAN_CORPUS } from '../data/defaultCorpus';
import firebaseAppletConfig from '../../firebase-applet-config.json';

let db: ReturnType<typeof getFirestore> | null = null;

export function getFirestoreDB() {
  if (db) return db;

  try {
    const config = firebaseAppletConfig;
    if (config && config.projectId) {
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
  try {
    const firestore = getFirestoreDB();
    if (!firestore) return [...DEFAULT_SRANAN_CORPUS];

    const colRef = collection(firestore, COLLECTION_NAME);
    const getDocsPromise = getDocs(colRef);
    const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 2500));

    const snapshot = await Promise.race([getDocsPromise, timeoutPromise]);

    if (!snapshot || snapshot.empty) {
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

const TTS_COLLECTION_NAME = 'ttsCache';

export interface TTSCacheRecord {
  id: string;
  hash: string;
  text: string;
  voiceName: string;
  audioBase64: string;
  mimeType: string;
  createdAt: string;
}

/**
 * Retrieve TTS audio record from Cloud Firestore cache by hash.
 */
export async function getTTSAudioFromFirestore(hash: string): Promise<TTSCacheRecord | null> {
  try {
    const firestore = getFirestoreDB();
    if (!firestore) return null;

    const docRef = doc(firestore, TTS_COLLECTION_NAME, hash);
    const getDocPromise = getDoc(docRef);
    const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500));

    const snapshot = await Promise.race([getDocPromise, timeoutPromise]);
    if (snapshot && snapshot.exists()) {
      return snapshot.data() as TTSCacheRecord;
    }
  } catch (err) {
    console.error('Error fetching TTS item from Cloud Firestore cache:', err);
  }
  return null;
}

/**
 * Save TTS audio record to Cloud Firestore cache.
 */
export async function saveTTSAudioToFirestore(record: TTSCacheRecord): Promise<boolean> {
  const firestore = getFirestoreDB();
  if (!firestore) return false;

  try {
    // Check size limit: Firestore document size limit is ~1MB.
    // Ensure base64 string is under 950,000 chars to avoid exceeding 1MB payload.
    if (record.audioBase64.length > 950000) {
      console.warn(`[Firestore TTS Cache] Audio payload too large (${record.audioBase64.length} chars) for Firestore document, skipping cloud sync.`);
      return false;
    }
    const docRef = doc(firestore, TTS_COLLECTION_NAME, record.hash);
    await setDoc(docRef, record, { merge: true });
    console.log(`[Firestore TTS Cache] Successfully saved audio [${record.hash}] (${Math.round(record.audioBase64.length / 1024)} KB) to Cloud Firestore.`);
    return true;
  } catch (err) {
    console.error('Error saving TTS item to Cloud Firestore cache:', err);
    return false;
  }
}
