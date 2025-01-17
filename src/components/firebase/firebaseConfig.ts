// src/firebase/firebaseConfig.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDM-EVFmMyWfbCb0QcT4N2cwTZ-aP0rXks",
    authDomain: "saveethahub.firebaseapp.com",
    projectId: "saveethahub",
    storageBucket: "saveethahub.firebasestorage.app",
    messagingSenderId: "750163172041",
    appId: "1:750163172041:web:1328c0c6d315d4ac7fcb18",
    measurementId: "G-THE06YGDJS"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
