import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGlobalContext } from '@/components/GlobalContext';
import { JT } from '@/types/types';
import localForage from '@/localForageConfig';

const JobTrackerContext = createContext<JT.JobTrackerContext | undefined>(undefined);

function useJobTrackerProvider() {
    const [jobItem, setJobItem] = useState<JT.JobItem[]>([])
    const [newJobItem, setNewJobItem] = useState<JT.JobItem>({
        id: "",
        companyName: "",
        position: "",
        payRange: "0-20k",
        location: "Tacoma, WA",
        dateApplied: "",
        source: "Indeed",
        status: "Applied",
        applicationType: "Job",
        jobLink: "",
    })

    const { jobList, submissionCount, setSubmissionCount } = useGlobalContext();
    
    useEffect(() => {
        setJobItem(jobList); 
    }, [jobList]);

    /* ------------------------------ */
    /* ######## Add Job Item ######## */
    /* ------------------------------ */
    const addJobItem = async (newItem: JT.DbJobItem) => {
        try {
            const response = await fetch('/api/firestore/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });
            if (!response.ok) throw new Error('Failed to save the job item');

            const addedItem = await response.json();

            setJobItem((prevItems) => [...prevItems, addedItem]);

            const currentItems = (await localForage.getItem<JT.JobItem[]>('jobItems')) || [];
            await localForage.setItem('jobItems', [...currentItems, addedItem]);

            //@ts-ignore
            setSubmissionCount(submissionCount + 1);
        } catch(error) {
            console.error('Error adding job item:', error);
        }
    }

    /* ------------------------------ */
    /* ####### Edit Job Item ######## */
    /* ------------------------------ */
    const editJobItem = async (
        id: string,
        updatedItem: JT.JobItem
    ): Promise<Omit<JT.JobItem, 'id'> | undefined> => {
        const editedItem = { ...updatedItem };
        try {
            const response = await fetch('/api/firestore/jobs', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, editedItem }),
            });
            if (!response.ok) throw new Error('Failed to update the job item');

            const updatedItem = await response.json();

            setJobItem((prevItems) => prevItems.map((item) => (item.id === id ? updatedItem : item)));
            setSubmissionCount(submissionCount + 1);

            const { id: _, ...newJobItem } = updatedItem;
            if (!newJobItem) return;
            return newJobItem;
        } catch (error) {
            console.error('Error editing job item:', error);
        }
    }

    /* ------------------------------ */
    /* ###### Archive Job Item ###### */
    /* ------------------------------ */
    const archiveJobItem = async (
        id: string,
        updatedItem: JT.JobItem
    ): Promise<Omit<JT.JobItem, 'id'> | undefined> => {
        const editedItem = { ...updatedItem };
        try {
            const response = await fetch('/api/firestore/jobs', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, editedItem }),
            });
            if (!response.ok) throw new Error('Failed to update the job item');

            setJobItem((prevItems) => prevItems.map((item) => (item.id === id ? updatedItem : item)));
            setSubmissionCount(submissionCount + 1);

            const { id: _, ...newJobItem } = updatedItem;
            if (!newJobItem) return;
            return newJobItem;
        } catch (error) {
            console.error('Error archiving job item:', error);
        }
    }

    /* ------------------------------ */
    /* ###### Delete Job Item ####### */
    /* ------------------------------ */
    const deleteJobItem = async (id: string) => {
        try {
            const response = await fetch('/api/firestore/jobs', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) throw new Error('Failed to delete the job item');

            setJobItem((prevItems) => prevItems.filter((item) => item.id !== id));
            setSubmissionCount(submissionCount + 1);

            const currentItems = (await localForage.getItem<JT.JobItem[]>('jobItems')) || [];
            await localForage.setItem('jobItems', currentItems.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error deleting job item:', error);
        }
    }


    /* ----------------------------- */
    /* ###### Clear Job Fields ##### */
    /* ----------------------------- */
    const clearFields = () => {
        setNewJobItem({
            id: "",
            companyName: "",
            position: "",
            payRange: "",
            location: "Tacoma, WA",
            dateApplied: "",
            source: "Indeed",
            status: "Applied",
            applicationType: "Job",
            jobLink: "",
        });
    };

    return {
        jobItem,
        newJobItem,
        setNewJobItem,
        setJobItem,
        
        addJobItem,
        clearFields,
        deleteJobItem,
        editJobItem,
        archiveJobItem,
    };
}

export const JobTrackerProvider = ({ children }: { children: React.ReactNode }) => {
    const value = useJobTrackerProvider();
    return <JobTrackerContext.Provider value={value}>{children}</JobTrackerContext.Provider>;
};

export const useJobTrackerContext = () => {
    const context = useContext(JobTrackerContext);
    if (context === undefined) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};
