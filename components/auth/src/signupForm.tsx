'use client';
import useAuthState from '../useAuthState';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '@/lib/firebase';
import {getFirestore, doc, setDoc} from 'firebase/firestore';
// Styles
import style from '../styles/form.module.css';

export default function SignupForm(): JSX.Element {
	const {signupData, setSignupData} = useAuthState();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSignupData({...signupData, [e.target.name]: e.target.value});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (signupData.password !== signupData.passwordConfirm) {
			alert('Passwords do not match!');
			return;
		}
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				signupData.email,
				signupData.password
			);
			const user = userCredential.user;
			console.log('<SignupForm> $handleSubmit |user|:', user);

			// Firestore Database Setup
			const db = getFirestore();
			// !Establishes user data in /users/ collection
			await setDoc(doc(db, 'users', user.uid), {
				uid: user.uid,
				username: signupData.username,
				email: signupData.email,
			});
			// !Establishes user data in /userData/ collection
			await setDoc(doc(db, 'userData', user.uid), {
				session: [
					{
						banking: [],
						calendar: [],
						todo: [],
						study: [],
						resources: [],
						analytics: [],
						settings: [],
					},
				]

			});
		} catch (error) {
			// @ts-ignore
			const errorCode = error.code;
			// @ts-ignore
			const errorMessage = error.message;
			console.error('#%d>>!ERROR THROWN!<< <SignupForm> $handeSubmit |ERROR|:', errorCode, errorMessage);
		}
	};

	return (
		<form className={style.form} onSubmit={handleSubmit}>
			<div className={style.header_container}>
				<h1 className={style.header}>Signup</h1>
			</div>
			<label htmlFor='username' className={style.label}>
				Username
			</label>
			<input type='text' name='username' id='username' className={style.input} onChange={handleChange} />

			<label htmlFor='email' className={style.label}>
				Email
			</label>
			<input type='email' name='email' id='email' className={style.input} onChange={handleChange} />

			<label htmlFor='password' className={style.label}>
				Password
			</label>
			<input
				type='password'
				name='password'
				id='password'
				className={style.input}
				onChange={handleChange}
			/>

			<label htmlFor='passwordConfirm' className={style.label}>
				Confirm Password
			</label>
			<input
				type='password'
				name='passwordConfirm'
				id='passwordConfirm'
				className={style.input}
				onChange={handleChange}
			/>

			<button type='submit' className={style.button}>
				Sign Up
			</button>
		</form>
	);
}
