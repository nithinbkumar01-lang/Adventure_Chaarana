import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize Firebase with environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phone } = req.body;

    if (!phone || typeof phone !== 'string' || phone.trim().length < 10) {
      return res.status(400).json({ error: 'Valid 10-digit phone number is required' });
    }

    const cleanPhone = phone.trim();
    
    // Save to Firestore
    const docRef = await addDoc(collection(db, 'waitlist'), {
      phoneNumber: cleanPhone,
      createdAt: serverTimestamp(),
      source: 'vercel_production_portal'
    });

    return res.status(200).json({ success: true, id: docRef.id });
  } catch (error) {
    console.error('Vercel API Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: message || 'Failed to save to database' });
  }
}
