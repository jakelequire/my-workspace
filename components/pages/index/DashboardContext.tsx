import React, { useContext, createContext, useState, useEffect, useMemo } from 'react';
import { DashboardContextType } from '@/types/client/dashboardApp';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

function useDashboardProvider() {
    const [timeRangeData, setTimeRangeData] = useState<string>('ONE_MONTH');


    return undefined;
}

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const value = useDashboardProvider();
    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};


export const useDashboardContext = () => {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};


