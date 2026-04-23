import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

// Load Firebase Config
// Note: In Vercel, files in the root are accessible via process.cwd()
const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
const firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// Initialize Firebase
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
  } catch (error: any) {
    console.error('Vercel API Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to save to database' });
  }
}
