import { applicationDefault, cert, getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, Timestamp, getFirestore } from 'firebase-admin/firestore';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const projectId = process.env.FIREBASE_PROJECT_ID ?? process.env.GCLOUD_PROJECT;
const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
let serviceAccountConfigured = false;

function initializeFirestoreApp() {
  if (getApps()[0]) return getApps()[0];
  if (serviceAccountJson) {
    try {
      const serviceAccount = JSON.parse(serviceAccountJson);
      const firebaseApp = initializeApp({
        credential: cert(serviceAccount),
        ...(projectId ? { projectId } : {}),
      });
      serviceAccountConfigured = true;
      return firebaseApp;
    } catch {
      console.error('[firestore] FIREBASE_SERVICE_ACCOUNT_JSON is invalid. Public content will use its fallback data.');
    }
  }
  return initializeApp({
    credential: applicationDefault(),
    ...(projectId ? { projectId } : {}),
  });
}

const app = initializeFirestoreApp();

export const db = getFirestore(app);
export { FieldValue, Timestamp };

export function isFirestoreConfigured() {
  if (serviceAccountConfigured) return true;
  const credentialsFile = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (credentialsFile) return existsSync(resolve(credentialsFile));
  return Boolean(process.env.FIRESTORE_EMULATOR_HOST || process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT || process.env.K_SERVICE || process.env.GAE_ENV);
}

export function serializeTimestamp(value: unknown): string | null {
  if (!value) return null;
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'string') return value;
  return null;
}
