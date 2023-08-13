// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFzJJhzFVCYWZb7usKqLFI-TPMUn4twwE",
  authDomain: "blogging-app-24912.firebaseapp.com",
  projectId: "blogging-app-24912",
  storageBucket: "blogging-app-24912.appspot.com",
  messagingSenderId: "17883093279",
  appId: "1:17883093279:web:667aa747a046cc4b21f82a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);