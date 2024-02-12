// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBbfQrE-ikc4kQoO0x0wiLclFVlwPQiwM",
  authDomain: "vatrenabaza2.firebaseapp.com",
  projectId: "vatrenabaza2",
  storageBucket: "vatrenabaza2.appspot.com",
  messagingSenderId: "873676979726",
  appId: "1:873676979726:web:9107b120fc6194a236865f",
  measurementId: "G-F5MWT6H6BY",
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
