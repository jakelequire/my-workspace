"use client";
import useAuthState from "../useAuthState";
import style from "../styles/signupform.module.css";

export default function SignupForm(): JSX.Element {

  const { signupData, setSignupData } = useAuthState();

  

  return (
    <form className={style.form}>
      <label htmlFor="username" className={style.label}>
        Username
      </label>
      <input
        type="text"
        name="username"
        id="username"
        className={style.input}
      />

      <label htmlFor="email" className={style.label}>
        Email
      </label>
      <input type="email" name="email" id="email" className={style.input} />

      <label htmlFor="password" className={style.label}>
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        className={style.input}
      />

      <label htmlFor="passwordConfirm" className={style.label}>
        Confirm Password
      </label>
      <input
        type="password"
        name="passwordConfirm"
        id="passwordConfirm"
        className={style.input}
      />

      <button type="submit" className={style.button}>
        Sign Up
      </button>
    </form>
  );
}
