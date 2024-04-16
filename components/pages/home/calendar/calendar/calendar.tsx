'use client';
import { useState } from 'react';
import styles from './calendar.module.css';
import { DateCalendar } from '@mui/x-date-pickers';
import { DayCalendarSkeleton } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ICalendar(): JSX.Element {
    const [value, onChange] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

    const highlightedDays = [new Date()];
    const handleMonthChange = (date: Date) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const ServerDay = ({ day }: any) => {
        return <div>{day}</div>;
    };

    return (
        <div className={styles.calendar_container}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
            </LocalizationProvider>
        </div>
    );
}
