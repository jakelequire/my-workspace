"use client"
import { useState, useEffect } from "react";
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function useSessionState() {
    const [user, setUser] = useState<User | null>(null);
    const [loggedIn, setLoggedIn] = useState<boolean>(false)

    const handleSignout = async () => {
        try {
            await signOut(auth);
            console.log('User signed out');
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                // The user is logged in.
                // You can store the user's information in your app's state here.
                console.log('User logged in: ', user);
                setLoggedIn(true)
                setUser(user);
            } else {
                // The user is not logged in.
                console.log('User not logged in');
                setLoggedIn(false)
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = () => {
        // ...
    }

    return {
        user,
        handleSignout,
        loggedIn,
    }
}