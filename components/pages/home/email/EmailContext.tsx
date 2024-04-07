'use client'
import React, { useContext, createContext, useState, useEffect, useMemo } from 'react';
import { useAppContext } from './AppContext';
import GraphService from './graphApi/NewGraphService';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { EmailResponse } from './types';


interface EmailContext {
    emails: EmailResponse[];
    setEmails: React.Dispatch<EmailResponse[]>;
    openMail: EmailResponse;
    setOpenMail: React.Dispatch<EmailResponse>;
    openEmail: (email: EmailResponse) => void;
}

const EmailContext = createContext<EmailContext>({
    emails: [],
    setEmails: () => { },
    openMail: {} as EmailResponse,
    setOpenMail: () => { },
    openEmail: () => { },
});

function useEmailProvider() {
    const [emails, setEmails] = useState<EmailResponse[] | []>([]);
    const [openMail, setOpenMail] = useState<EmailResponse>();

    const { authProvider } = useAppContext();
    
    const graphService = useMemo(() => new GraphService(authProvider as any), [authProvider]);

    const isAuthenticated = useIsAuthenticated();
    const { inProgress } = useMsal();

    useEffect(() => {
        if (!isAuthenticated && inProgress === InteractionStatus.None) {
            console.log("[useEmailProvider] !isAuthenticated: ", isAuthenticated)
        } else {
            console.log("[useEmailProvider] isAuthenticated: ", isAuthenticated)
            graphService.getUserEmails().then((emails) => {
                setEmails(emails);
            });
        }
    }, [inProgress, isAuthenticated, graphService]);


    const openEmail = (email: EmailResponse) => {
        setOpenMail(email);
    }

    return {
        emails,
        setEmails,
        openMail,
        setOpenMail,
        openEmail,
    };
}

export const EmailProvider = ({ children }: { children: React.ReactNode }) => {
    const value = useEmailProvider();
    return <EmailContext.Provider value={value}>{children}</EmailContext.Provider>;
};

export const useEmailContext = () => {
    const context = useContext(EmailContext);
    if (context === undefined) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};
