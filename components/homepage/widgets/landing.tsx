
import BankingWidget from './bankingWidget'
import style from '../styles/landing.module.css'


export default function Landing(): JSX.Element {

    return (
        <div className={style.landingContainer}>
            <BankingWidget />
        </div>
    )
}