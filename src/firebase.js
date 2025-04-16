// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup ,createUserWithEmailAndPassword} from "firebase/auth";
import { 
  getFirestore, collection, getDocs, addDoc, query, where, orderBy, serverTimestamp 
} from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

// ✅ Initialize Firebase Messaging (with error handling)
let messaging;
try {
  messaging = getMessaging(app);
} catch (error) {
  console.error("Firebase Messaging not supported in this environment:", error);
}

// ✅ Function to Request Notification Permission
const requestNotificationPermission = async () => {
  if (!messaging) return; // Skip if messaging isn't available

  try {
    const token = await getToken(messaging, { vapidKey: "YOUR_WEB_PUSH_CERTIFICATE_KEY" });
    if (token) {
      console.log("FCM Token:", token);
    } else {
      console.warn("No token received. Request permission.");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

// ✅ Handle Incoming Messages (Foreground)
if (messaging) {
  onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
    alert(`New Message: ${payload.notification.title} - ${payload.notification.body}`);
  });
}

// ✅ Export Firebase Services
export { 
  auth, provider, signInWithPopup, createUserWithEmailAndPassword, db, 
  messaging, requestNotificationPermission, addDoc, collection, getDocs, 
  query, where, orderBy, serverTimestamp
};
