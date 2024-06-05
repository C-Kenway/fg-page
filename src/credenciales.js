// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIYPCujwJarjrm78-dHzUWhP2v_2u9-30",
  authDomain: "miloginde-d2b8b.firebaseapp.com",
  projectId: "miloginde-d2b8b",
  storageBucket: "miloginde-d2b8b.appspot.com",
  messagingSenderId: "73426388672",
  appId: "1:73426388672:web:9f8bbe059f48d0b6be8f25"
};

// Initialize Firebase
const appfirebase = initializeApp(firebaseConfig);
export default appfirebase;