'use client';
import { JobTrackerProvider } from './jobTrackerContext';
import JobInput from './jobInput/jobInput';
import styles from './jobTracker.module.css';

export default function JobTrackerInterface(): JSX.Element {
    return (
        <JobTrackerProvider>
            <section className={styles.jobtracker_container}>
                <div className={styles.jobtracker_wrapper}>
                    <JobInput />
                    <div className={styles.jobtracker_header}>
                        <h2 className={styles.jobtracker_title}>Current Applications</h2>
                    </div>
                    {/* <DataTable /> */}
                </div>
            </section>
        </JobTrackerProvider>
    );
}
