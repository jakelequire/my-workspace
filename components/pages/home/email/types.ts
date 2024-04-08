
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


export interface DraftEmail {
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
    toRecipients: Array<Recipient>,
    webLink: string,
    isOpen?: boolean,
}

type Recipient = {
    emailAddress: {
        address: string,
        name: string,
    }
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

