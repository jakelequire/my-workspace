'use client';
import React, { useContext, createContext, useState, useEffect, useMemo } from 'react';

interface BudgetingContextType {
    
}

const BudgetingContext = createContext<undefined>(undefined);

function useBudgetingProvider() {
    return undefined;
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
