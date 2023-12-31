"use client";
import useAuthState from "../useAuthState";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import style from "../styles/form.module.css";

export default function LoginForm(): JSX.Element {
  const { loginData, setLoginData } = useAuthState();
  const [data, setData] = useState({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  // TODO: Change the handle submit to a useEffect hook
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginData.username,
        loginData.password
      );
      const user = userCredential.user;

      console.log("<LoginForm> User Logged in: ", user)
    } catch (error) {
      //@ts-ignore
      const errorCode = error.code;
      //@ts-ignore
      const errorMessage = error.message;
      console.error(`Error: ${errorCode} - ${errorMessage}`);
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.header_container}>
            <h1 className={style.header}>Login</h1>
        </div>
      <label htmlFor="username" className={style.label}>
        Username
      </label>
      <input
        type="text"
        name="username"
        id="username"
        className={style.input}
        onChange={handleChange}
      />

      <label htmlFor="password" className={style.label}>
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        className={style.input}
        onChange={handleChange}
      />

      <button type="submit" className={style.button}>
        Log In
      </button>
    </form>
  );
}
