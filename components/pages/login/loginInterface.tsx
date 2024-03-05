'use client';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firebase_app } from '@/lib/firebase-config';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation'
import { useAuthContext } from '@/app/AuthContext';
import styles from './login.module.css';

export default function LoginInterface(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setIsLoggedIn } = useAuthContext();
    const router = useRouter();

    function refreshPage() {
        window.location.reload();
    }

    const signIn = async (email: string, password: string) => {
        let result: any = null,
            error = null;
        try {
            result = await signInWithEmailAndPassword(auth, email, password);
            console.log('\n<!>signInWithEmailAndPassword result<!>\n', result);
            const idToken = await result.user.getIdToken(); // Directly obtain the ID token

            // !If no token is found, send a POST request to /api/login
            // !with the error message
            if(!idToken) {
                return await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ error: 'No token found'}),
                    credentials: 'include',
                }).then((res) => {
                    if(res.status === 200) {
                        /*DEBUG*/console.log('[LoginInterface] Redirecting to { / } ');
                        setIsLoggedIn(true);
                        refreshPage();
                    } else {
                        /*DEBUG*/console.log('[LoginInterface] Error in fetch { /api/login }');
                        setIsLoggedIn(false);
                        refreshPage();
                    }
                }).catch((er) => {
                    console.log('\n<!>Error in fetch /api/auth<!>\n', er);
                });
            }

            // Send POST request to /api/auth with the ID token in the Authorization header
            // If the status is 200, set isLoggedIn to true
            return await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`, // Send token in the header
                },
                body: JSON.stringify({ token: idToken }), // Send token in the body
                credentials: 'include', // For cookies
            }).then((res) => {
                if(res.status === 200) {
                    setIsLoggedIn(true);
                    refreshPage();
                } else {
                    setIsLoggedIn(false);
                    refreshPage();
                }
            }).catch((er) => {
                console.log('\n<!>Error in fetch /api/auth<!>\n', er);
            });
        } catch (e) {
            error = e;
            console.log('\n Error in signInWithEmailAndPassword: \n', e);
        }
    };

    const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const foo = await signIn(email, password);
        
        return foo;
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.wrapper}>
                <h1>Login</h1>
                <br />
                <form className={styles.login_form} onSubmit={handleForm}>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    );
}
