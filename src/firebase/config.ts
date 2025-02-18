import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyARThKUKhRQkvxWrrV8lNzFuqIOadM1L3o",
    authDomain: "teste-vylex.firebaseapp.com",
    projectId: "teste-vylex",
    storageBucket: "teste-vylex.appspot.com",
    messagingSenderId: "49506685754",
    appId: "1:49506685754:web:6b4f7efbbb720cd7e43603",
    measurementId: "G-GRN53DDC2J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };