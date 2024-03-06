'use client';
import React, { useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import { firebase_app } from '@/lib/firebase-config';
import Router from 'next/router';

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({
    user: null,
    loading: true,
    isLoggedIn: false,
    setIsLoggedIn: (value: boolean) => {},
    logout: async () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null); // Use null to denote no user
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                setUser(user);
            } else {
                setUser(null);
                setIsLoggedIn(false);
                singoutUser();
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [setIsLoggedIn]);

    const logout = async () => {
        setUser(null);
        setIsLoggedIn(false);
        await signOut(auth);
        console.log('!!!User signed out!!!');
    };


    return (
        <AuthContext.Provider value={{ user, loading, isLoggedIn, logout, setIsLoggedIn }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

async function singoutUser() {
    // makes request to /api/logout
    return await fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((res) => {
        if (res.ok) {
            console.log('User signed out');
        } else {
            console.log('Error signing out');
        }
    });
}
