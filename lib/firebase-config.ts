// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getApps, getApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAz22UO2NfIC3ELy1n0zrCeAfZroA33p0o',
    authDomain: 'my-workspace-8b9e9.firebaseapp.com',
    projectId: 'my-workspace-8b9e9',
    storageBucket: 'my-workspace-8b9e9.appspot.com',
    messagingSenderId: '284008368707',
    appId: '1:284008368707:web:9289d809032cb7758b62f6',
};

// Initialize Firebase
const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(firebase_app);

export { firebase_app, auth };