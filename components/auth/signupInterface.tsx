import SignupForm from './src/signupForm'
import style from './signup.module.css'

export default function SignupInterface(): JSX.Element {

    return (
        <main className={style.main}>
            <SignupForm />
        </main>
    )
}