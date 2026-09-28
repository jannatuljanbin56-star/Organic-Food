import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// User's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDwyGnIJ3zLXA5LoqDrcbzG4362FJQWOGY",
  authDomain: "organic-food-887cd.firebaseapp.com",
  projectId: "organic-food-887cd",
  storageBucket: "organic-food-887cd.firebasestorage.app",
  messagingSenderId: "419009305306",
  appId: "1:419009305306:web:6ae373e6758f59f1d1e3e3",
  measurementId: "G-V8XBX5D48E"
};

// Initialize Firebase app safely (prevent multiple initializations)
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore & Auth
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize Analytics safely
export let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log('Firebase Analytics initialized successfully for Organic Food');
    }
  }).catch((err) => {
    console.warn('Firebase Analytics not supported in this environment:', err);
  });
}

export default app;
