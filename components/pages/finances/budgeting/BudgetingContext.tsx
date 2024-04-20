'use client';
import React, { useContext, createContext, useState, useEffect, useMemo } from 'react';

export interface SubscriptionItem {
    id: string;
    companyName: string;
    amount: number;
    date: string;
    frequency: string;
    url: string;
    pfpUrl: string;
}

interface FileData {
    id: string;
    url: string;
    file: File;
}

interface FileResponse {
    url: string;
}

interface BudgetingContextType {
    subscriptions: SubscriptionItem[];
    addNewSubscription: (newSubscription: SubscriptionItem) => void;
    selectedSubscription: SubscriptionItem | null;
    setSelectedSubscription: (subscription: SubscriptionItem) => void;
    uploadPhoto: FileData | null;
    setUploadPhoto: (file: FileData) => void;
    handleUploadPhoto: (file: FileData) => Promise<FileResponse>;
}

const BudgetingContext = createContext<BudgetingContextType | undefined>(undefined);

function useBudgetingProvider() {
    const [uploadPhoto, setUploadPhoto] = useState<FileData | null>(null);
    const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>([]);
    const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionItem | null>(null);


    useEffect(() => {
        fetchSubscriptions();
    }, []);

    // <fetchSubscriptions>
    const fetchSubscriptions = async () => {
        const response = await fetch('/api/firestore/finances/budgeting');
        if(response.ok) {
            const data = await response.json();
            setSubscriptions(data);
        } else {
            console.error('Failed to fetch subscriptions');
            const error = await response.json();
            console.error(error);
        }
    }
    // </fetchSubscriptions>


    // <NewSubscriptionItem>
    const addNewSubscription = async (newSubscription: SubscriptionItem) => {
        const response = await fetch('/api/firestore/finances/budgeting', {
            method: 'POST',
            body: JSON.stringify(newSubscription),
        });
        if(response.ok) {
            console.log('New subscription added');
            const data = await response.json();
            setSubscriptions([...subscriptions, data]);
        } else {
            console.error('Failed to add new subscription');
            const error = await response.json();
            console.error(error);
        }
    }
    // <NewSubscriptionItem />


    // <handleUploadPhoto>
    const handleUploadPhoto = async (fileData: FileData) => {
        const { file } = fileData;
        const data = await file.arrayBuffer()
        console.log("[handleUploadPhoto] data: ", data)
        const response = await fetch('/api/storage/subscriptions/upload', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/octet-stream',
            }
        });
        if(response.ok) {
            console.log('Photo uploaded');
            const data = await response.json();
            return data;
        } else {
            console.error('Failed to upload photo');
            const error = await response.json();
            console.error(error);
            return error;
        }
    }
    // </handleUploadPhoto>

    return {
        subscriptions,
        addNewSubscription,
        selectedSubscription,
        setSelectedSubscription,
        handleUploadPhoto,
        uploadPhoto,
        setUploadPhoto,
    };
}

export const BudgetingProvider = ({ children }: { children: React.ReactNode }) => {
    const value = useBudgetingProvider();
    return <BudgetingContext.Provider value={value}>{children}</BudgetingContext.Provider>;
};

export const useBudgetingContext = () => {
    const context = useContext(BudgetingContext);
    if (context === undefined) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};
