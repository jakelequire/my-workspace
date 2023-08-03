'use client';
import { useState, useEffect } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function useSessionState() {
	const [user, setUser] = useState<User | null>(null);
	const [uid, setUid] = useState<string>('');
	const [loggedIn, setLoggedIn] = useState<boolean>(false);

	const handleSignout = async () => {
		try {
			await signOut(auth);
			console.log('<useSessionState> User signed out');
		} catch (error) {
			console.error('<useSessionState> Error signing out: ', error);
		}
	};

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log('<useSessionState> User logged in: ', user);
                setLoggedIn(true);
                setUser(user);
                setUid(user.uid);
                // ...
            } else {
                // User is signed out
                // ...
                console.log('<useSessionState> User not logged in');
                setLoggedIn(false);
                setUser(null);
                setUid('');
            }
            return () => unsubscribe();
        }
        );
    }, [setLoggedIn, setUser, setUid])

	const handleLogin = () => {
		// ...
	};

	return {
		user,
		uid,
		handleSignout,
		loggedIn,
	};
}
