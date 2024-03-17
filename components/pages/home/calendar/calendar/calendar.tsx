'use client';
import { useState } from 'react';
import Calendar from 'react-calendar';
import styles from './calendar.module.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ICalendar(): JSX.Element {
    const [value, onChange] = useState<Value>(new Date());

    return (
        <div className={styles.calendar_container}>
            <Calendar className={styles.calendar} onChange={onChange} showWeekNumbers value={value} />
        </div>
    );
}
