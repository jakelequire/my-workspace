'use client';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase-config';
import { useState } from 'react';
import { useAuthContext } from '@/app/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import styles from './login.module.css';

export default function LoginInterface(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setIsLoggedIn } = useAuthContext();

    const router = useRouter();

    const signIn = async (email: string, password: string) => {
        let result: any = null,
            error = null;
        try {
            result = await signInWithEmailAndPassword(auth, email, password);
            console.log('\n<!>signInWithEmailAndPassword result<!>\n', result);
            const idToken = await result.user.getIdToken(); // Directly obtain the ID token

            // !If no token is found, send a POST request to /api/login
            // !with the error message
            /*!*/ if(!idToken) {
            /*!*/     return await fetch('/api/login', {
            /*!*/         method: 'POST',
            /*!*/         headers: {
            /*!*/             'Content-Type': 'application/json',
            /*!*/         },
            /*!*/         body: JSON.stringify({ error: 'No token found'}),
            /*!*/         credentials: 'include',
            /*!*/     }).then((res) => {
            /*!*/         if(res.status === 200) {
            /*!*/             setIsLoggedIn(true);
            /*!*/             router.push('/');
            /*!*/         } else {
            /*!*/             setIsLoggedIn(false);
            /*!*/             router.push('/login');
            /*!*/         }
            /*!*/     }).catch((er) => {
            /*!*/         console.log('\n<!>Error in fetch /api/auth<!>\n', er);
            /*!*/     });
            /*!*/ }
            //! --------------------------------------------

            // Send POST request to /api/auth with the ID token in the Authorization header
            // If the status is 200, set isLoggedIn to true
            return await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`,
                },
                body: JSON.stringify({ token: idToken }),
                credentials: 'include',
            }).then((res) => {
                if(res.status === 200) {
                    setIsLoggedIn(true);
                    router.push('/');
                } else {
                    setIsLoggedIn(false);
                    router.push('/login');
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
                <form className={styles.login_form} onSubmit={handleForm}>
                    <h1 className={styles.title}>Login</h1>

                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        className={styles.input}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        className={styles.input}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className={styles.button_container}>
                        <Button type='submit'>Login</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
