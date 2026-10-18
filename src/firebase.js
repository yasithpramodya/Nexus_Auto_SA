import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBp3m1DFvkJqVJgraCPt3a_9EUa5XjKxms",
  authDomain: "nexusautosa-7a3ed.firebaseapp.com",
  projectId: "nexusautosa-7a3ed",
  storageBucket: "nexusautosa-7a3ed.firebasestorage.app",
  messagingSenderId: "1000128002220",
  appId: "1:1000128002220:web:3b4f6f7983a2f804d38709",
  measurementId: "G-WXS0CBS1Z0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);