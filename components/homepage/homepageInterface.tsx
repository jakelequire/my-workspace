import Landing from './widgets/landing'
import style from './styles/home.module.css'


export default function HomepageInterface(): JSX.Element {

    return (
        <main className={style.homepage}>
            <Landing />
        </main>
    )
}