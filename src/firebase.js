// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);