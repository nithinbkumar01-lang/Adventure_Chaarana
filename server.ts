import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load Firebase Config
const firebaseConfig = JSON.parse(fs.readFileSync(join(__dirname, 'firebase-applet-config.json'), 'utf-8'));

// Initialize Firebase (Server-side)
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Route: Handle Waitlist Submissions
  // This runs on the server, so it won't be blocked by browser AdBlockers
  app.post('/api/waitlist', async (req, res) => {
    try {
      console.log('[Server] Received request body:', req.body);
      const { phone } = req.body;

      if (!phone || typeof phone !== 'string' || phone.trim().length < 10) {
        console.warn(`[Server] Invalid phone received: "${phone}"`);
        return res.status(400).json({ error: 'Valid 10-digit phone number is required' });
      }

      const cleanPhone = phone.trim();
      console.log(`[Server] Saving ${cleanPhone} to Firestore...`);
      
      const docRef = await addDoc(collection(db, 'waitlist'), {
        phoneNumber: phone,
        createdAt: serverTimestamp(),
        source: 'server_proxy_portal'
      });

      console.log(`[Server] Saved successfully with ID: ${docRef.id}`);
      res.status(200).json({ success: true, id: docRef.id });
    } catch (error) {
      console.error('[Server] Firestore Error:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message || 'Failed to save to database' });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
