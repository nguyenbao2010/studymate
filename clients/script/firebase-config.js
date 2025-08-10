import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBsZvKDxVeeCc_abu9lpX7V7pcq7OqeAJQ",
  authDomain: "studymate-cae77.firebaseapp.com",
  databaseURL: "https://studymate-cae77-default-rtdb.firebaseio.com",
  projectId: "studymate-cae77",
  storageBucket: "studymate-cae77.firebasestorage.app",
  messagingSenderId: "499041011253",
  appId: "1:499041011253:web:daf2f327b5b90c399d137c",
  measurementId: "G-1TL6MQYLYF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, deleteDoc, doc };
