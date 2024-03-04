'use client';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firebase_app } from '@/lib/firebase-config';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginInterface(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const signIn = async (email: string, password: string) => {
        let result: any = null,
            error = null;
        try {
            result = await signInWithEmailAndPassword(auth, email, password);
            console.log('\n<!>signInWithEmailAndPassword result<!>\n', result);
            const idToken = await result.user.getIdToken(); // Directly obtain the ID token

            // Send POST request to /api/auth with the ID token in the Authorization header
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: idToken }), // Send token in the body
                credentials: 'include', // For cookies
            });

            console.log('\n<!>res<!>\n', res.status);

            if (res.ok) {
                // Handle successful authentication, e.g., store auth state or redirect
                router.push('/');
            } else {
                // Handle errors, e.g., invalid token or server error
                error = new Error('Authentication failed');
            }
        } catch (e) {
            error = e;
            console.log('\n Error in signInWithEmailAndPassword: \n', e);
        }

        return { result, error };
    };

    const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log('\n Error in Login: \n', error);
        }

        // else successful
        console.log('<LoginInterface> Result: ', result);
        return router.push('/');
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
