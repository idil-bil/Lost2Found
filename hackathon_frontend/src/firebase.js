// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6Rt5C7kKIbfmu8TiPoTTa7zBDPgJHgtg",
  authDomain: "hackathon-2025-7046a.firebaseapp.com",
  projectId: "hackathon-2025-7046a",
  storageBucket: "hackathon-2025-7046a.firebasestorage.app",
  messagingSenderId: "519286396322",
  appId: "1:519286396322:web:ed0b8377126bf6cbc2cefb",
  measurementId: "G-X7RFVP2QZQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
