'use client';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase-config';
import { useState } from 'react';
import { useAuthContext } from '@/app/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import LoginService from './loginService';

import styles from './login.module.css';

export default function LoginInterface(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { setIsLoggedIn } = useAuthContext();

    const router = useRouter();
    const loginService = new LoginService();

    const signIn = async (email: string, password: string) => {
        try {
            if (!email) {
                setError(true);
                throw new Error('No email provided');
            }
            if (!password) {
                setError(true);
                throw new Error('No password provided');
            }
            if (!auth) {
                setError(true);
                throw new Error('No auth object found');
            }

            const signInResult = await signInWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    console.log('\n[signInWithEmailAndPassword] res: ', res);
                    return res;
                })
                .catch((err: Error) => {
                    console.log('\n<!>Error in signInWithEmailAndPassword<!>\n', err);
                    setError(true);
                    throw new Error('Username / Password is incorrect.');
                });

            const idToken = await signInResult.user.getIdToken();
            if (!idToken) {
                setError(true);
                setErrorMessage('No ID token');
                throw new Error('No ID token');
            }

            const signIn = loginService.handleSignIn(idToken);
            if(signIn instanceof Error) {
                setError(true);
                // Send server that an error occurred and to clean up the session
                loginService.signInError();
                throw new Error('<!> Error in signin.');
            } else {
                setIsLoggedIn(true);
                router.push('/');
                router.refresh();
            }
        } catch (error: any) {
            const errorMsg = error.message;

            setError(true);
            setErrorMessage(errorMsg);
            throw new Error('Error in signin.');
        }
    };

    const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const signin = await signIn(email, password);
        return signin;
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
                        name='current-password'
                        className={styles.input}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className={styles.button_container}>
                        <Button type='submit'>Login</Button>
                    </div>

                    <div className='flex w-full justify-center mt-3'>
                        <p className='text-sm italic max-w-[50%] self-center text-center'>
                            {error ? (
                                <span className='text-red-500'>
                                    {errorMessage}
                                </span>
                            ) : (
                                <span className='text-gray-400'>
                                    Please enter your email and password
                                </span>
                            )}
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
