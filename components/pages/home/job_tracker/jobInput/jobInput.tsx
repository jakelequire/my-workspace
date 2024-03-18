'use client';
import { getAuth } from 'firebase/auth';
import { firebase_app } from '@/lib/firebase-config';
import { Button } from '@/components/ui/button';
import { useJobTrackerContext } from '../jobTrackerContext';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { JT } from '@/types/types';
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

        const newJob: JT.DbJobItem = {
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
        const response = await sendJob(newJob);

        if (response) {
            // Verify response structure matches expected TodoItem
            console.log('Adding todo item:', response);
            addJobItem(response);
        } else {
            console.error('Failed to add new task, response:', response);
        }
    };

    const sendJob = async (jobItem: JT.DbJobItem) => {
        const auth = getAuth(firebase_app);
        const user = auth.currentUser?.uid;
        /* DEBUG */ console.log('User ID:', user);
        if(!user) {
            console.error('User not found');
            return;
        }

        const body = {
            userId: user,
            jobItem: jobItem,
        };

        // Send the task to the server endpoint /api/firestore
        const sendRequest = await fetch('/api/firestore/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const response: JT.AddJobServerResponse = await sendRequest.json();
        return response;
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
