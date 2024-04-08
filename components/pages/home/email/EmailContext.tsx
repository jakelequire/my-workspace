'use client'
import React, { useContext, createContext, useState, useEffect, useMemo } from 'react';
import { useAppContext } from './AppContext';
import GraphService from './graphApi/NewGraphService';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { EmailResponse, MailFolder } from './types';


interface EmailContext {
    emails: EmailResponse[];
    setEmails: React.Dispatch<EmailResponse[]>;
    openMail: EmailResponse | undefined;
    setOpenMail: React.Dispatch<EmailResponse>;
    openEmail: (email: EmailResponse) => void;
    folders: MailFolder[];
    currentFolder: CurrentFolder;
    changeFolder: (folder: string) => void;
}

interface CurrentFolder { 
    folder: string;
    id: string;
}

const EmailContext = createContext<EmailContext>({
    emails: [],
    setEmails: () => { },
    openMail: undefined,
    setOpenMail: () => { },
    openEmail: () => { },
    folders: [],
    currentFolder: { folder: 'Inbox', id: '' },
    changeFolder: () => { },
});

function useEmailProvider() {
    const [emails, setEmails] = useState<EmailResponse[] | []>([]);
    const [openMail, setOpenMail] = useState<EmailResponse>();
    const [folders, setFolders] = useState<MailFolder[] | []>([]);
    const [currentFolder, setCurrentFolder] = useState({
        folder: 'Inbox',
        id: '"AQMkADAwATNiZmYAZC02MDkzLWVjZjAtMDACLTAwCgAuAAADldBYTk_kRkGBgsGeuX5CcwEAKJcwiW9xEEKfi46JjdVRWAAAAgEMAAAA"',
    });

    const { authProvider } = useAppContext();
    
    const graphService = useMemo(() => new GraphService(authProvider as any), [authProvider]);

    const isAuthenticated = useIsAuthenticated();
    const { inProgress } = useMsal();

    useEffect(() => {
        if (!isAuthenticated && inProgress === InteractionStatus.None) {
            console.log("[useEmailProvider] !isAuthenticated: ", isAuthenticated)
        } else {
            graphService.getMailFolders().then((folders) => {
                setFolders(folders);
            });
        }
    },[inProgress, isAuthenticated, graphService]);

    useEffect(() => {
        if (!isAuthenticated && inProgress === InteractionStatus.None) {
            console.log("[useEmailProvider] !isAuthenticated: ", isAuthenticated)
        } else {
            graphService.getUserEmails(currentFolder.id, currentFolder.folder).then((emails) => {
                setEmails(emails);
            });
        }
    }, [inProgress, isAuthenticated, graphService, currentFolder.folder, currentFolder.id]);


    const changeFolder = (folder: string) => {
        const findFolderId = folders.find((f) => f.displayName === folder);
        setCurrentFolder({
            folder: folder,
            id: findFolderId?.id as string,
        });
        setFolders(folders.map((f) => {
            if (f.displayName === folder) {
                f.isOpen = true;
            } else {
                f.isOpen = false;
            }
            return f;
        }));
    }


    const openEmail = (email: EmailResponse) => {
        setOpenMail(email);
    }

    return {
        emails,
        setEmails,
        openMail,
        setOpenMail,
        openEmail,
        folders,
        currentFolder,
        changeFolder,
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
