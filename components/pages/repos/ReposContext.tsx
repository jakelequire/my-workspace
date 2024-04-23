'use client';
import React, { useContext, createContext, useState, useEffect, useMemo } from 'react';


const ReposContext = createContext<undefined>(undefined);


function useReposProvider() {



    return undefined;
}

export const ReposProvider = ({ children }: { children: React.ReactNode }) => {
    const value = useReposProvider();
    return <ReposContext.Provider value={value}>{children}</ReposContext.Provider>;
};


export const useReposContext = () => {
    const context = useContext(ReposContext);
    if (context === undefined) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};
