
/*
    This is the format of the email object that is returned from the Microsoft Graph API.
    This object is used to display the email in the email list.
*/
export interface EmailResponse {
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



