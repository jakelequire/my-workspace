import Navbar from '@/components/misc/navbar/navbar';
import JobTrackerInterface from '@/components/pages/home/job_tracker/jobTrackerInterface';
import styles from '../../page.module.css';

export default function Jobs() {
    return (
        <main className={styles.main}>
            <Navbar />
            <JobTrackerInterface />
        </main>
    );
}
