import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_BASE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_BASE_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_BASE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_BASE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_BASE_FIREBASE_APP_ID,
});
