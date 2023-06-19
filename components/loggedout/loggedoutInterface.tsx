"use client"
import { useState } from 'react';
import style from './loggedout.module.css';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/app';
import 'firebase/auth';

// Your firebase config here...

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
  const analytics = getAnalytics(app);

export default function LoggedOutInterface(): JSX.Element {

    const [signupData, setSignupData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleSignup = async (e) => {
        e.preventDefault();
        if (signupData.password !== signupData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            await firebase.auth().createUserWithEmailAndPassword(signupData.email, signupData.password);
            alert("Signup successful");
        } catch (error) {
            alert(error.message);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password);
            alert("Login successful");
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <main className={style.container}>

            <form className={style.form} onSubmit={handleSignup}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })} />

                <button type="submit">Signup</button>
            </form>

            <form className={style.form} onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />

                <button type="submit">Login</button>
            </form>

        </main>
    )
}
