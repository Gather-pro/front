import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Your existing Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBCNxLTbQ93z3GE5lYIo-l2RxZphPeZMSk",
  authDomain: "m-e-events-2cf91.firebaseapp.com",
  projectId: "m-e-events-2cf91",
  storageBucket: "m-e-events-2cf91.firebasestorage.app",
  messagingSenderId: "1096057328806",
  appId: "1:1096057328806:web:bcf7db14c310b6092c5067",
  measurementId: "G-K5T4D5Y45Z"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
// Get Firebase Auth instance
const auth = getAuth(app);
// Get Firebase Storage instance
const storage = getStorage(app);

export { auth, storage };
