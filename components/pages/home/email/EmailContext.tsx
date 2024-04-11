'use client'
import React, { useContext, createContext, useState, useEffect, useMemo } from 'react';
import { useAppContext } from './AppContext';
import GraphService from './graphApi/NewGraphService';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { EmailResponse, MailFolder } from './types';
import { IEmailContext, NewEmail, CurrentFolder, ReplyEmail } from '@/types/client/emailApp';


const EmailContext = createContext<IEmailContext | undefined>(undefined);

function useEmailProvider() {
    // Handle the state of the emails displayed / open email.
    const [emails, setEmails] = useState<EmailResponse[] | []>([]);
    const [openMail, setOpenMail] = useState<EmailResponse | undefined>(undefined);
    // Handle the state of the folders displayed in the sidebar.
    const [folders, setFolders] = useState<MailFolder[] | []>([]);
    const [currentFolder, setCurrentFolder] = useState({
        folder: 'Inbox',
        id: '"AQMkADAwATNiZmYAZC02MDkzLWVjZjAtMDACLTAwCgAuAAADldBYTk_kRkGBgsGeuX5CcwEAKJcwiW9xEEKfi46JjdVRWAAAAgEMAAAA"',
    });
    // Handle the state of the tab selected. (focused | other | unread)
    const [tab, setTab] = useState<string>('focused');
    // Handle the state of the new email modal.
    const [isNewEmailOpen, setIsNewEmailOpen] = useState<boolean>(false);
    // Handle the state of the reply email modal.
    const [isReplyEmailOpen, setIsReplyEmailOpen] = useState<boolean>(false);
    const [replyEmailThread, setReplyEmailThread] = useState<ReplyEmail | undefined>()

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

    /**
     * @public
     * 
     * @description Changes the current folder.
     * 'Inbox' | 'Drafts' | 'Sent Items' | 'dJunk Email' | 'Deleted Items'
     */
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

    /**
     * @public
     * 
     * @description Deletes a specified email.
     */
    const deleteEmail = async (emailId: string) => {
        graphService.deleteEmail(emailId).then(() => {
            setEmails(emails.filter((email) => email.id !== emailId));
        }).catch((error) => {
            throw new Error("Error deleting email", error)
        });
    }

    /**
     * @public
     * 
     * @description Sets an email as read. Updates the API with the new status.
     */
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

    /**
     * @public
     * 
     * @description Flags an email as important.
     * Updates the API with the new status.
     */
    const flagEmail = (messageId: string) => {
        const email = emails.find((email) => email.id === messageId);
        let flaggedStatus = '';
        if (email && email.flag.flagStatus === 'notFlagged') {
            flaggedStatus = 'flagged';
            setEmails(emails.map((e) => {
                if (e.id === messageId) {
                    e.flag.flagStatus = 'flagged';
                }
                return e;
            }));
            graphService.messageFlagged(messageId, flaggedStatus);
        } else {
            flaggedStatus = 'notFlagged';
            setEmails(emails.map((e) => {
                if (e.id === messageId) {
                    e.flag.flagStatus = 'notFlagged';
                }
                return e;
            }));
            graphService.messageFlagged(messageId, flaggedStatus);
        }
    }

    /**
     * @public
     * 
     * @description Creation of a new email. [NOT A REPLY EMAIL]
     */
    const sendNewEmail = async (email: NewEmail) => {
        await graphService.sendNewEmail(email).then(() => {
            console.log("Email sent");
        }).catch((error) => {
            console.error("[useEmailProvider] newEmail error: ", error);
        });
    }


    const replyToEmail = async (email: NewEmail, messageId: string) => {
        await graphService.replyToEmail(email, messageId).then(() => {
            console.log("Email replied");
        }).catch((error) => {
            console.error("[useEmailProvider] replyToEmail error: ", error);
            throw new Error("Error replying to email", error);
        });
    }


    /**
     * @public
     * 
     * @description Sets the current display to the email that was clicked.
     */
    const openEmail = (email: EmailResponse) => {
        setOpenMail(email);
    }

    /**
     * @public
     * 
     * @description Manual refresh for emails.
     */
    const refreshEmails = async () => {
        await graphService.getUserEmails(currentFolder.id, currentFolder.folder).then((emails) => {
            setEmails(emails);
        }).catch((error) => {
            console.error("[useEmailProvider] refreshEmails error: ", error);
            return [];
        });
    }


    const retrieveOtherEmails = async () => {
        await graphService.getOtherEmails().then((emails) => {
            setEmails(emails);
        }).catch((error) => {
            console.error("[useEmailProvider] retrieveOtherEmails error: ", error);
            return [];
        })
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
        isReplyEmailOpen,
        setIsReplyEmailOpen,
        replyEmailThread,
        setReplyEmailThread,
        replyToEmail,
        flagEmail,
        retrieveOtherEmails,
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
