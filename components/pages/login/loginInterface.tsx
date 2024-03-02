'use client';
import { getRedirectResult, signInWithRedirect } from 'firebase/auth';
import { auth, provider } from '@/lib/firebase-config';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginInterface(): JSX.Element {
    const router = useRouter();

    useEffect(() => {
        getRedirectResult(auth).then(async (userCred) => {
            if (!userCred) {
                return;
            }

            fetch('/api/login', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${await userCred.user.getIdToken()}`,
                },
            }).then((response) => {
                if (response.status === 200) {
                    router.push('/protected');
                }
            });
        });
    }, []);

    function signIn() {
        signInWithRedirect(auth, provider);
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const email = form.email.value;
        const password = form.password.value;

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        }).then((response) => {
            if (response.status === 200) {
                router.push('/protected');
            }
        });
    }

    return (
    <div className={styles.login_container}>
        <form className={styles.login_form} onSubmit={onSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />

            <button type="submit">Login</button>
        </form>
    </div>
    )
}
