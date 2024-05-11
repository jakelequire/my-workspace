'use client';
import React, { useContext, createContext, useState, useEffect, useMemo } from 'react';



interface IDocsContext {
    currentDoc: JSX.Element;
    setCurrentDoc: (doc: JSX.Element) => void;
}

const DocsContext = createContext<IDocsContext | undefined>(undefined);


function useDocsProvider() {
    const [currentDoc, setCurrentDoc] = useState<JSX.Element>(<></>);


    return {
        currentDoc,
        setCurrentDoc
    };
}

export const DocsProvider = ({ children }: { children: React.ReactNode }) => {
    const value = useDocsProvider();
    return <DocsContext.Provider value={value}>{children}</DocsContext.Provider>;
};


export const useDocsContext = () => {
    const context = useContext(DocsContext);
    if (context === undefined) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};
