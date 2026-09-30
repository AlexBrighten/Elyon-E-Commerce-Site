import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import fs from 'fs';
import path from 'path';

// Note: You must generate a Service Account Key from Firebase Console
// (Project Settings -> Service Accounts -> Generate New Private Key)
// Save it as 'serviceAccountKey.json' in the root of the backend folder.
const __dirname = path.resolve();
const serviceAccountPath = path.join(__dirname, 'backend', 'serviceAccountKey.json');

let app;
if (fs.existsSync(serviceAccountPath)) {
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

  app = initializeApp({
    credential: cert(serviceAccount)
  });
} else {
  console.warn('Firebase Admin is not initialized because serviceAccountKey.json was not found.');
}

export const adminAuth = app ? getAuth(app) : null;
