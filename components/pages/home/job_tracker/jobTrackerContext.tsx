import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGlobalContext } from '@/components/GlobalContext';
import { JT } from '@/types/types';


const JobTrackerContext = createContext<JT.JobTrackerContext | undefined>(undefined);

function useJobTrackerProvider() {
    const [submissionCount, setSubmissionCount] = useState(0);
    const [jobItem, setJobItem] = useState<JT.JobItem[]>([])
    const [newJobItem, setNewJobItem] = useState<JT.JobItem>({
        id: "",
        companyName: "",
        position: "",
        payRange: "",
        location: "",
        dateApplied: "",
        source: "",
        status: "",
        applicationType: "",
    })

    // const { todoList } = useGlobalContext();
    
    // useEffect(() => {
    //     setJobItems(example); // Taken from Gobal Context
    // }, [example]);

    const addJobItem = (newItem: JT.JobItem) => {
        setJobItem((prevItems) => [...prevItems, newItem]);
    };

    const editJobItem = (
        id: string,
        updatedItem: JT.JobItem
    ): Omit<JT.JobItem, 'id'> | undefined => {
        setJobItem((prevItems) => prevItems.map((item) => (item.id === id ? updatedItem : item)));
        const { id: _, ...newJobItem } = updatedItem;
        if (!newJobItem) return;
        return newJobItem;
    };

    const deleteJobItem = (id: string) => {
        setJobItem((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const clearFields = () => {
        setNewJobItem({
            id: "",
            companyName: "",
            position: "",
            payRange: "",
            location: "",
            dateApplied: "",
            source: "",
            status: "",
            applicationType: "",
        });
    };

    return {
        submissionCount,
        setSubmissionCount,
        jobItem,
        newJobItem,
        setJobItem,
        setNewJobItem,
        addJobItem,
        clearFields,
        deleteJobItem,
        editJobItem,
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
