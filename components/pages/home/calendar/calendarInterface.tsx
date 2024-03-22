import ICalendar from './calendar/calendar'
import styles from './calendar.module.css'


export default function CalendarInterface(): JSX.Element {


    return (
        <section className={styles.calendar_container}>
            <ICalendar />
        </section>
    )
}