// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// import firebase from 'firebase/app';
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAskgJ-ZDl8_4mQABotoRzT_qyLQAAbVoE",
  authDomain: "my-workspace-2cee9.firebaseapp.com",
  projectId: "my-workspace-2cee9",
  storageBucket: "my-workspace-2cee9.appspot.com",
  messagingSenderId: "172380189070",
  appId: "1:172380189070:web:4b9d3b2fb063bee19074df",
  measurementId: "G-JQWD5GRL0V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);