



export interface EmailContext {
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

