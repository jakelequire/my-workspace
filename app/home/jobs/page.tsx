import Navbar from '@/components/misc/navbar/navbar';
import JobTrackerInterface from '@/components/pages/home/job_tracker/jobTrackerInterface';
import styles from '../../page.module.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Jobs | Jakes Workspace',
};

export default function Jobs() {
    return (
        <main className={styles.main}>
            <Navbar />
            <JobTrackerInterface />
        </main>
    );
}
