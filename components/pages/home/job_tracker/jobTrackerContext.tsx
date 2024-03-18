import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGlobalContext } from '@/components/GlobalContext';
import { JT } from '@/types/types';

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

    const addJobItem = (newItem: JT.JobItem) => {
        setJobItem((prevItems) => [...prevItems, newItem]);
        setSubmissionCount(submissionCount + 1);
    };

    const editJobItem = (
        id: string,
        updatedItem: JT.JobItem
    ): Omit<JT.JobItem, 'id'> | undefined => {
        setJobItem((prevItems) => prevItems.map((item) => (item.id === id ? updatedItem : item)));
        setSubmissionCount(submissionCount + 1);
        const { id: _, ...newJobItem } = updatedItem;
        if (!newJobItem) return;
        return newJobItem;
    };

    const archiveJobItem = (
        id: string,
        updatedItem: JT.JobItem
    ): Omit<JT.JobItem, 'id'> | undefined  => {
        setJobItem((prevItems) => prevItems.map((item) => (item.id === id ? updatedItem : item)));
        setSubmissionCount(submissionCount + 1);
        const { id: _, ...newJobItem } = updatedItem;
        if (!newJobItem) return;
        return newJobItem;
    }

    const deleteJobItem = (id: string) => {
        setJobItem((prevItems) => prevItems.filter((item) => item.id !== id));
        setSubmissionCount(submissionCount + 1);
    };


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
