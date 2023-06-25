// calendar.tsx
import style from '../styles/calendar.module.css'

export default function Calendar(): JSX.Element {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daysOfMonth = Array.from({length: 31}, (_, i) => i + 1); // assuming all months have 31 days for now

    return (
        <div className={style.calendar_container}>
            <div className={style.calendar_header}>
                {daysOfWeek.map((day, index) => (
                    <div key={index} className={style.calendar_header_day}>
                        {day}
                    </div>
                ))}
            </div>
            <div className={style.calendar_grid}>
                {daysOfMonth.map((day, index) => (
                    <div key={index} className={style.calendar_day}>
                        {day}
                    </div>
                ))}
            </div>
        </div>
    )
}
