
import style from "../styles/loginform.module.css"

export default function LoginForm(): JSX.Element {

    return (
        <form className={style.form}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />

            <button type="submit">Log In</button>
        </form>
    )
}