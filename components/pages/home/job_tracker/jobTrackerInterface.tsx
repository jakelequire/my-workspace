'use client';
import { JobTrackerProvider } from './jobTrackerContext';
import { useGlobalContext } from '@/components/GlobalContext';
import JobsDisplay from './jobsDisplay/jobsDisplay';
import JobInput from './jobInput/jobInput';
import styles from './jobTracker.module.css';

export default function JobTrackerInterface(): JSX.Element {
    const { submissionCount } = useGlobalContext();
    return (
        <JobTrackerProvider>
            <section className={styles.jobtracker_container}>
                <div className={styles.jobtracker_wrapper}>
                    <JobInput />
                    <div className={styles.jobtracker_tabs}>
                        <JobsDisplay key={submissionCount} />
                    </div>
                </div>
            </section>
        </JobTrackerProvider>
    );
}
