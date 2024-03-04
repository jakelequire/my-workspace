"use client"
import React, { useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import { cookies } from 'next/headers';
import { firebase_app } from '@/lib/firebase-config';
import Router from 'next/router';

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({ 
    user: null, 
    loading: true,
    isLoggedIn: false,
    logout: async () => {}
});


export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null); // Use null to denote no user
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setIsLoggedIn(true);
                Router.push('/home'); // Redirect to the home page if the user is logged in
            } else {
                setUser(null);
                setIsLoggedIn(false);
                singoutUser();
                Router.push('/login'); // Redirect to the login page if the user is not logged in
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);


    const logout = async () => {
        await signOut(auth).then(() => {
            // Successfully signed out
            setUser(null); // Update the user state to null
        }).catch((error) => {
            // An error happened.
            console.error("Logout Error:", error);
        });
    };

    return (
        <AuthContext.Provider value={{ user, loading, isLoggedIn, logout }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

function singoutUser() {
    // makes request to /api/logout
    return fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // For cookies
    }).then((res) => {
        if (res.ok) {
            console.log('User signed out');
        } else {
            console.log('Error signing out');
        }
    });
}