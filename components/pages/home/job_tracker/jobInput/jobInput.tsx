'use client';
import { getAuth } from 'firebase/auth';
import { firebase_app } from '@/lib/firebase-config';
import { Button } from '@/components/ui/button';
import { useJobTrackerContext } from '../jobTrackerContext';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { JobsApp } from '@/types/types';
import {
    CompanyNameInput,
    PositionInput,
    PayRangeInput,
    LocationInput,
    SourceInput,
    StatusInput,
    ApplicationTypeInput,
    JobLinkInput,
} from './inputFields';

import styles from './jobInput.module.css';

export default function JobInput(): JSX.Element {
    const { newJobItem, addJobItem, clearFields } = useJobTrackerContext();

    const handleAddJob = async () => {
        const date = new Date();
        const formattedDate = format(date, 'PP');

        const newJob: JobsApp.DbJobItem = {
            companyName: newJobItem.companyName,
            position: newJobItem.position,
            payRange: newJobItem.payRange,
            location: newJobItem.location,
            dateApplied: formattedDate,
            source: newJobItem.source,
            status: newJobItem.status,
            applicationType: newJobItem.applicationType,
            jobLink: newJobItem.jobLink,
        };
        clearFields();
        addJobItem(newJob);
    };

    return (
        <div className={styles.jobinput_container}>
            <div className={styles.jobinput_header}>
                <h2 className={styles.jobinput_title}>New Job Application</h2>
            </div>
            <div className={styles.jobinput_wrapper}>
                <div className={styles.jobinput_fields}>
                    <div className={styles.jobinput_companyinfo}>
                        <CompanyNameInput />
                        <PositionInput />
                    </div>
                    <div className={styles.jobinput_metadata}>
                        <PayRangeInput />
                        <LocationInput />
                        <SourceInput />
                        <StatusInput />
                        <ApplicationTypeInput />
                        <JobLinkInput />
                    </div>
                </div>
                <div className={styles.button_container}>
                    <Button
                        type='submit'
                        className={`${styles.jobinput_button}`}
                        onClick={() => {
                            handleAddJob();
                            toast.success('A new job has been created.', {
                                description: `New job application for ${newJobItem.companyName} has been added to the job tracker.`,
                                duration: 2000,
                            });
                        }}>
                        Add Job
                    </Button>
                </div>
            </div>
        </div>
    );
}
