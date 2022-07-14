import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyB7N3KJKB6nOxedEOP3TTpA4SjEqEY2kP8",
    authDomain: "bank-app-81bca.firebaseapp.com",
    projectId: "bank-app-81bca",
    storageBucket: "bank-app-81bca.appspot.com",
    messagingSenderId: "475311837853",
    appId: "1:475311837853:web:ddcd278cdcc1794d1eba74",
    measurementId: "G-7S9CZHTFMJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const firestore = getFirestore(app)


export { auth, firestore }