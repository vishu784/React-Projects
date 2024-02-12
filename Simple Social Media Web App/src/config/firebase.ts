// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {  getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJhJBFvINMTQZ3GsXs-CyJdJFmLTR8ZCc",
  authDomain: "react-project1-ec289.firebaseapp.com",
  projectId: "react-project1-ec289",
  storageBucket: "react-project1-ec289.appspot.com",
  messagingSenderId: "281377806930",
  appId: "1:281377806930:web:d18a63849b41dcf03b1d8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
