
import BankingWidget from './bankingWidget'
import ToDoWidget from './todoWidget'
import ReminderWidget from './reminderWidget'
import style from '../styles/landing.module.css'


export default function Landing(): JSX.Element {

    return (
        <div className={style.landingContainer}>
            <BankingWidget />
            <ToDoWidget />
            <ReminderWidget />
        </div>
    )
}