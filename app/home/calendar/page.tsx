import Navbar from '@/components/misc/navbar/navbar';
import CalendarInterface from '@/components/pages/home/calendar/calendarInterface';
import styles from '../../page.module.css';
import { Metadata } from 'next';


export default function Calendar() {
    return (
        <main className={styles.main}>
            <Navbar />
            <CalendarInterface />
        </main>
    );
}
