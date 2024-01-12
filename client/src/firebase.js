// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_FIREBASE_URL,
  authDomain: "mern-stack-acfb0.firebaseapp.com",
  projectId: "mern-stack-acfb0",
  storageBucket: "mern-stack-acfb0.appspot.com",
  messagingSenderId: "975313492802",
  appId: "1:975313492802:web:c1e4ea22d0bcaed12c86db"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);




