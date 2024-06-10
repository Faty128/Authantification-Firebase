// src/firebase.js
// import { auth } from "../firebase";
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'; // Importez les fournisseurs Google et Facebook

const firebaseConfig = {
  apiKey: "AIzaSyCsERrOX1tp4xJqexOwzd3n2WUqlnvOcpA",
  authDomain: "authentification-f8f99.firebaseapp.com",
  projectId: "authentification-f8f99",
  storageBucket: "authentification-f8f99.appspot.com",
  messagingSenderId: "1013868181748",
  appId: "1:1013868181748:web:c01f55af0024945cce06a1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialisez les fournisseurs Google et Facebook
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
