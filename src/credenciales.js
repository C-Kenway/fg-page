// credenciales.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIYPCujwJarjrm78-dHzUWhP2v_2u9-30",
  authDomain: "miloginde-d2b8b.firebaseapp.com",
  projectId: "miloginde-d2b8b",
  storageBucket: "miloginde-d2b8b.appspot.com",
  messagingSenderId: "73426388672",
  appId: "1:73426388672:web:9f8bbe059f48d0b6be8f25"
};

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

export { appFirebase, db };
