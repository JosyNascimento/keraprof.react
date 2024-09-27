// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


  const firebaseConfig = {
    apiKey: "AIzaSyCGe3hII4Q3WqIy2vM54sQD5x8-LCYuqy0",
    authDomain: "keraprofreact.firebaseapp.com",
    projectId: "keraprofreact",
    storageBucket: "keraprofreact.appspot.com",
    messagingSenderId: "878322506214",
    appId: "1:878322506214:web:bcc418a5be3386fd2a5e27",
    measurementId: "G-1FPVQHLLR5"
  };

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; 
