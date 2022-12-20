// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'; //
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
        apiKey: "AIzaSyDCOJGQSOtZq8emk0Xh2kP9944XZ6BrxZQ",
        authDomain: "final-project-d88f3.firebaseapp.com",
        projectId: "final-project-d88f3",
        storageBucket: "final-project-d88f3.appspot.com",
        messagingSenderId: "911583051503",
        appId: "1:911583051503:web:974bc6ce85e575b699a51a"

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(); //buat akses auth
export const db = getFirestore(app) //buat akses firestore