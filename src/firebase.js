// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHULT8SO-kGglVlEfSi3FYTUPVx742_Zs",
  authDomain: "chat-f95f9.firebaseapp.com",
  projectId: "chat-f95f9",
  storageBucket: "chat-f95f9.appspot.com",
  messagingSenderId: "655702764752",
  appId: "1:655702764752:web:4ff355184d92a9363dc2d5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();