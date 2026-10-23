import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDELS5hg8b9u1rNPv2frCU4JqLjqxvuSBE",
  authDomain: "nexus-auto-sa.firebaseapp.com",
  projectId: "nexus-auto-sa",
  storageBucket: "nexus-auto-sa.firebasestorage.app",
  messagingSenderId: "869480498149",
  appId: "1:869480498149:web:eb3e38b6695d3ce808a50c",
  measurementId: "G-7MRWJEX846"
};

// Only this Workspace account can sign in to the admin portal
export const ADMIN_EMAIL = "sales@nexusautosa.com.au";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
