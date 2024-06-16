// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDGdUSxHwKUGL4NWaQq_z6Ex4KSgxlWHig",
    authDomain: "e-commerce-3d587.firebaseapp.com",
    projectId: "e-commerce-3d587",
    storageBucket: "e-commerce-3d587.appspot.com",
    messagingSenderId: "576725083107",
    appId: "1:576725083107:web:9641344343363d0bb4f6d6"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();