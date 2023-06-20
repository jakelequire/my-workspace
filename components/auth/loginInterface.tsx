import LoginForm from "./src/loginForm"

import style from "./login.module.css"

export default function LoginInterface(): JSX.Element {

    return (
        <main className={style.main}>
            <LoginForm />
        </main>
    )
}