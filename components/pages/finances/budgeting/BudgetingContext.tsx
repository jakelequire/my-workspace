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
    handleUploadPhoto: (file: FileData) => Promise<string>;
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
        if (response.ok) {
            const data = await response.json();
            setSubscriptions(data);
        } else {
            console.error('Failed to fetch subscriptions');
            const error = await response.json();
            console.error(error);
        }
    };
    // </fetchSubscriptions>

    // <NewSubscriptionItem>
    const addNewSubscription = async (newSubscription: SubscriptionItem) => {
        const response = await fetch('/api/firestore/finances/budgeting', {
            method: 'POST',
            body: JSON.stringify(newSubscription),
        });
        if (response.ok) {
            console.log('New subscription added');
            const data = await response.json();
            setSubscriptions([...subscriptions, data]);
        } else {
            console.error('Failed to add new subscription');
            const error = await response.json();
            console.error(error);
        }
    };
    // <NewSubscriptionItem />

    // <handleUploadPhoto>
    const handleUploadPhoto = async (fileData: FileData): Promise<string> => {
        const { id, url, file } = fileData;
        // Create FormData object to hold the file and metadata
        const formData = new FormData();

        // Append the file; 'file' is the key used by the server to retrieve the binary file
        formData.append('file', file, file.name);

        // Append the metadata
        formData.append('id', id);
        formData.append('url', url);

        // Send request to the server
        const response = await fetch('/api/storage/subscriptions/upload', {
            method: 'POST',
            body: formData, // Send the FormData object
            // No need to set 'Content-Type': 'application/octet-stream'
            // The browser will automatically set 'Content-Type' to 'multipart/form-data'
        });

        if (response.ok) {
            console.log('Upload successful');
        } else {
            console.error('Upload failed', response.statusText);
        }

        const data = await response.json();
        console.log("[handleUploadPhoto] data: ", data)
        return data
    };
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
