// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaGGQbCLWYVn6grR-4pKh9nwj5GZRxx2Y",
  authDomain: "email-password-with-auth-342f4.firebaseapp.com",
  projectId: "email-password-with-auth-342f4",
  storageBucket: "email-password-with-auth-342f4.firebasestorage.app",
  messagingSenderId: "131131410948",
  appId: "1:131131410948:web:15e5c20ee76db8eb388351",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
