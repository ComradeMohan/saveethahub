// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRjKHxrMXeXkEos92DAVWoMwqpp-VYLlk",
  authDomain: "saveethahub-91e30.firebaseapp.com",
  projectId: "saveethahub-91e30",
  storageBucket: "saveethahub-91e30.firebasestorage.app",
  messagingSenderId: "915364665988",
  appId: "1:915364665988:web:c35a1f60e2afba683d00d1",
  measurementId: "G-1B01FPQ9DX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
