// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection, 
     addDoc, getDocs, updateDoc, doc, deleteDoc} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_BDFi7W3-qhPK6tWkb9TehKvIWkY5uk0",
  authDomain: "watchlist2-1b1a4.firebaseapp.com",
  projectId: "watchlist2-1b1a4",
  storageBucket: "watchlist2-1b1a4.appspot.com",
  messagingSenderId: "622909337238",
  appId: "1:622909337238:web:938454850ba76bb6c21cb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db, getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc};