// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyCqy_L3gIQ8qKsmjoTLMrTEbCCp7cKWqds",
    authDomain: "classicmafia.firebaseapp.com",
    projectId: "classicmafia",
    storageBucket: "classicmafia.appspot.com",
    messagingSenderId: "1090942979473",
    appId: "1:1090942979473:web:64cfc8b0638b52df1a9e30"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);