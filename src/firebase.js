// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3YHe4KlN8GrrAS5a5vpxB3Sr-112U1po",
  authDomain: "todo-app-react-1a25d.firebaseapp.com",
  projectId: "todo-app-react-1a25d",
  storageBucket: "todo-app-react-1a25d.appspot.com",
  messagingSenderId: "771071194700",
  appId: "1:771071194700:web:3941fab2dd12bf7c5626e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);