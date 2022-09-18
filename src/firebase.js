// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAT0kXvtehRIidGkOUW-m4p-IagdEv_3eY",
    authDomain: "hackit-a16a2.firebaseapp.com",
    projectId: "hackit-a16a2",
    storageBucket: "hackit-a16a2.appspot.com",
    messagingSenderId: "728793221192",
    appId: "1:728793221192:web:215cd900ab71db835d307d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
export default app;
export { auth, db };