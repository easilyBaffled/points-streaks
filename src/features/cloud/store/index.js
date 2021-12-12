import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7U2xm2iJuhM6XOs4dGMtAmqlT6TWh1I0",
    authDomain: "points-streaks.firebaseapp.com",
    projectId: "points-streaks",
    storageBucket: "points-streaks.appspot.com",
    messagingSenderId: "72274275033",
    appId: "1:72274275033:web:a9f21b39f1856ea326acc8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { app, db };
