'use client';
import { JobTrackerProvider } from './jobTrackerContext';
import JobsDisplay from './jobsDisplay/jobsDisplay';
import JobInput from './jobInput/jobInput';
import styles from './jobTracker.module.css';

export default function JobTrackerInterface(): JSX.Element {
    return (
        <JobTrackerProvider>
            <section className={styles.jobtracker_container}>
                <div className={styles.jobtracker_wrapper}>
                    <JobInput />
                    <div className={styles.jobtracker_tabs}>
                        <JobsDisplay />
                    </div>
                </div>
            </section>
        </JobTrackerProvider>
    );
}
