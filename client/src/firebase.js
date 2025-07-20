// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pdfsummarizer-83da2.firebaseapp.com",
  projectId: "pdfsummarizer-83da2",
  storageBucket: "pdfsummarizer-83da2.firebasestorage.app",
  messagingSenderId: "499212086749",
  appId: "1:499212086749:web:438c6cca7587962aec9a34"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);