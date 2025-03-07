// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup ,createUserWithEmailAndPassword} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_I05eW6R3He8Xj_ByGVi_xSsD5J-DAyw",
  authDomain: "saveethahub-cb3a9.firebaseapp.com",
  projectId: "saveethahub-cb3a9",
  storageBucket: "saveethahub-cb3a9.firebasestorage.app",
  messagingSenderId: "747596429747",
  appId: "1:747596429747:web:2f6edd084d4d2bb28933c6",
  measurementId: "G-DQ9G839TL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const db = getFirestore(app); // Firestore instance

export { auth, provider, signInWithPopup,  createUserWithEmailAndPassword, db };
