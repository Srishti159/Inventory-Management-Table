// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBx54AXQ06Mzk9MRBNiHelknBNcGKSZHIc",
    authDomain: "inventory-cc3bb.firebaseapp.com",
    projectId: "inventory-cc3bb",
    storageBucket: "inventory-cc3bb.firebasestorage.app",
    messagingSenderId: "700968934729",
    appId: "1:700968934729:web:ad106abdf617db19180e98",  
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
