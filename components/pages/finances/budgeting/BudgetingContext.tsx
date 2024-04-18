'use client';
import React, { useContext, createContext, useState, useEffect, useMemo } from 'react';

interface SubscriptionItem {
    id: string;
    companyName: string;
    amount: number;
    date: string;
    frequency: string;
    url: string;
    pfp: File | null;
}

interface BudgetingContextType {
    subscriptions: SubscriptionItem[];
    setSubscriptions: React.Dispatch<React.SetStateAction<SubscriptionItem[]>>;
}

const BudgetingContext = createContext<BudgetingContextType | undefined>(undefined);

function useBudgetingProvider() {
    const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>([]);



    return {
        subscriptions,
        setSubscriptions,
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
