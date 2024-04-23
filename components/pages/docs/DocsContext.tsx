'use client';
import React, { useContext, createContext, useState, useEffect, useMemo } from 'react';


const DocsContext = createContext<undefined>(undefined);


function useDocsProvider() {



    return undefined;
}

export const DocsProvider = ({ children }: { children: React.ReactNode }) => {
    const value = useDocsProvider();
    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};


export const useDocsContext = () => {
    const context = useContext(DocsContext);
    if (context === undefined) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};
