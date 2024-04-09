'use client'
import React, { useContext, createContext, useState, useEffect, useMemo } from 'react';
import { useAppContext } from './AppContext';
import GraphService from './graphApi/NewGraphService';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { EmailResponse, MailFolder } from './types';


export interface NewEmail {
    message: {
        subject: string;
        body: {
            contentType: string;
            content: string;
        };
        toRecipients: [
            {
                emailAddress: {
                    address: string;
                };
            }
        ];
        ccRecipients: [
            {
                emailAddress: {
                    address: string;
                };
            }
        ];
    };
    saveToSentItems: string;
}

interface EmailContext {
    emails: EmailResponse[];
    setEmails: React.Dispatch<EmailResponse[]>;
    openMail: EmailResponse | undefined;
    setOpenMail: React.Dispatch<EmailResponse | undefined>;
    openEmail: (email: EmailResponse) => void;
    folders: MailFolder[];
    currentFolder: CurrentFolder;
    changeFolder: (folder: string) => void;
    deleteEmail: (emailId: string) => void;
    readEmail: (messageId: string) => void;
    tab: string;
    setTab: React.Dispatch<string>;
    sendNewEmail: (email: NewEmail) => void;
    isNewEmailOpen: boolean;
    setIsNewEmailOpen: React.Dispatch<boolean>;
    refreshEmails: () => void;
}

interface CurrentFolder { 
    folder: string;
    id: string;
}

const EmailContext = createContext<EmailContext | undefined>(undefined);

function useEmailProvider() {
    const [emails, setEmails] = useState<EmailResponse[] | []>([]);
    const [openMail, setOpenMail] = useState<EmailResponse | undefined>();
    const [folders, setFolders] = useState<MailFolder[] | []>([]);
    const [currentFolder, setCurrentFolder] = useState({
        folder: 'Inbox',
        id: '"AQMkADAwATNiZmYAZC02MDkzLWVjZjAtMDACLTAwCgAuAAADldBYTk_kRkGBgsGeuX5CcwEAKJcwiW9xEEKfi46JjdVRWAAAAgEMAAAA"',
    });
    const [tab, setTab] = useState<string>('focused');
    const [createNewEmail, setCreateNewEmail] = useState<NewEmail | undefined>();
    const [isNewEmailOpen, setIsNewEmailOpen] = useState<boolean>(false);


    /* ----------------------------------------------------- */
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

    const deleteEmail = (emailId: string) => {
        graphService.deleteEmail(emailId).then(() => {
            setEmails(emails.filter((email) => email.id !== emailId));
        });
    }

    const readEmail = (messageId: string) => {
        const email = emails.find((email) => email.id === messageId);
        if (email && email.isRead === false) {
            setEmails(emails.map((e) => {
                if (e.id === messageId) {
                    e.isRead = true;
                }
                return e;
            }));
            graphService.messageRead(messageId);
        } else {
            console.log("Email is already read");
        }
    }


    const sendNewEmail = (email: NewEmail) => {
        graphService.sendNewEmail(email).then(() => {
            console.log("Email sent");
        }).catch((error) => {
            console.error("[useEmailProvider] newEmail error: ", error);
        });
    }


    const openEmail = (email: EmailResponse) => {
        setOpenMail(email);
    }

    const refreshEmails = async () => {
        await graphService.getUserEmails(currentFolder.id, currentFolder.folder).then((emails) => {
            setEmails(emails);
        }).catch((error) => {
            console.error("[useEmailProvider] refreshEmails error: ", error);
            return [];
        });
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
        deleteEmail,
        readEmail,
        tab,
        setTab,
        sendNewEmail,
        isNewEmailOpen,
        setIsNewEmailOpen,
        refreshEmails,
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
