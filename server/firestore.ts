import { applicationDefault, cert, getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, Timestamp, getFirestore } from 'firebase-admin/firestore';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const projectId = process.env.FIREBASE_PROJECT_ID ?? process.env.GCLOUD_PROJECT;
const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

const app = getApps()[0] ?? initializeApp({
  credential: serviceAccountJson ? cert(JSON.parse(serviceAccountJson)) : applicationDefault(),
  ...(projectId ? { projectId } : {}),
});

export const db = getFirestore(app);
export { FieldValue, Timestamp };

export function isFirestoreConfigured() {
  if (serviceAccountJson) return true;
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
