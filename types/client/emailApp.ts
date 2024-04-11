

/*
    This is the format of the email object that is returned from the Microsoft Graph API.
    This object is used to display the email in the email list.
*/
export interface EmailResponse {
    folder: string;
    bccRecipients: Array<any>;
    body: {
        content: string,
        contentType: string,
    }
    bodyPreview: string,
    categories: Array<any>,
    ccRecipients: Array<any>,
    changeKey: string,
    conversationId: string,
    conversationIndex: string,
    createdDateTime: string,
    flag: {
        flagStatus: string,
    },
    from: {
        emailAddress: {
            address: string,
            name: string,
        }
    },
    hasAttachments: boolean,
    id: string,
    importance: string,
    inferenceClassification: string,
    internetMessageId: string,
    isDeliveryReceiptRequested: boolean,
    isDraft: boolean,
    isRead: boolean,
    isReadReceiptRequested: boolean,
    lastModifiedDateTime: string,
    parentFolderId: string,
    receivedDateTime: string,
    replyTo: Array<any>,
    sender: {
        emailAddress: {
            address: string,
            name: string,
        }
    },
    sentDateTime: string,
    subject: string,
    toRecipients: Array<any>,
    webLink: string,
    isOpen?: boolean,
}

export interface DraftEmail extends Omit<EmailResponse, 'toRecipients'> {
    toRecipients: Array<Recipient>;
}

export type Recipient = {
    emailAddress: {
        address: string,
        name: string,
    }
}

export interface CurrentFolder { 
    folder: string;
    id: string;
}

export interface MailFolder {
    childFolderCount: number;
    displayName: string;
    id: string;
    isHidden: boolean;
    parentFolderId: string;
    sizeInBytes: number;
    totalItemCount: number;
    unreadItemCount: number;
    isOpen?: boolean;
}

export interface ReplyEmail {
    message: NewEmail;
    thread: Array<EmailResponse>;
}


export interface IEmailContext {
    emails: EmailResponse[];
    setEmails: React.Dispatch<EmailResponse[]>;
    openMail: EmailResponse | undefined;
    setOpenMail: React.Dispatch<EmailResponse | undefined>;
    openEmail: (email: EmailResponse) => void;
    folders: MailFolder[];
    currentFolder: CurrentFolder;
    changeFolder: (folder: string) => void;
    deleteEmail: (emailId: string) => Promise<void>;
    readEmail: (messageId: string) => void;
    tab: string;
    setTab: React.Dispatch<string>;
    sendNewEmail: (email: NewEmail) => Promise<void>;
    isNewEmailOpen: boolean;
    setIsNewEmailOpen: React.Dispatch<boolean>;
    refreshEmails: () => void;
    isReplyEmailOpen: boolean;
    setIsReplyEmailOpen: React.Dispatch<boolean>;
    replyEmailThread: ReplyEmail | undefined;
    setReplyEmailThread: React.Dispatch<ReplyEmail | undefined>;
    replyToEmail: (email: NewEmail, messageId: string) => Promise<void>;
    flagEmail: (messageId: string) => void;
    retrieveOtherEmails: () => void;
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

