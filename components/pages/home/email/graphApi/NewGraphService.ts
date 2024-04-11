import {
    Client,
    GraphRequestOptions,
    PageCollection,
    PageIterator,
} from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { endOfWeek, startOfWeek } from 'date-fns';
import { User, Event } from '@microsoft/microsoft-graph-types';
import { EmailResponse } from '../types';
import { NewEmail } from '@/types/client/emailApp';


interface Folder {
    id: string;
    displayName: string;
    totalItemCount: number;
    unreadItemCount: number;
}

export default class GraphService {
    private graphClient: Client;

    constructor(authProvider: AuthCodeMSALBrowserAuthenticationProvider) {
        this.graphClient = Client.initWithMiddleware({
            authProvider: authProvider,
        });
    }

    private async isClientInitialized(): Promise<boolean> {
        const resolve = new Promise((resolve, reject) => {
            if (this.graphClient) {
                resolve(true);
            } else {
                reject(false);
            }
        });
        if (await resolve) {
            return true;
        } else {
            return false;
        }
    }

    private ensureClient() {
        if (!this.graphClient) {
            throw new Error('Graph client is not initialized.');
        } else {
            console.log('[GraphService] ensureClient authProvider: ', this.graphClient);
        }
    }

    public async getUser(): Promise<User> {
        this.ensureClient();
        const isClientInitialized = await this.isClientInitialized();

        if (!isClientInitialized) {
            throw new Error('Graph client is not initialized.');
        } else {
            const user: User = await this.graphClient
                .api('/me')
                .select('displayName,mail,mailboxSettings,userPrincipalName')
                .get();

            return user;
        }
    }

    /* ----------------------------------------------------- */
    /* ----------------- EMAIL RELATED METHODS ------------- */
    /* ----------------------------------------------------- */

    private async getFolderIds(): Promise<any> {
        this.ensureClient();
        const isClientInitialized = await this.isClientInitialized();

        if (!isClientInitialized) {
            throw new Error('Graph client is not initialized.');
        } else {
            const folders = await this.graphClient.api('/me/mailFolders').get();
            return folders.value;
        }
    }

    /**
     * @description Get user emails from Microsoft Graph API
     */
    public async getUserEmails(folderId: string, displayName: string): Promise<EmailResponse[]> {
        this.ensureClient();
        const isClientInitialized = await this.isClientInitialized();

        if (!isClientInitialized) {
            throw new Error('Graph client is not initialized.');
        } else {
            const mail = await this.graphClient
                .api(`/me/mailFolders/${folderId}/messages`)
                // .filter(`inferenceClassification eq 'focused'`)
                .top(50)
                .get();

            const mailItems: EmailResponse[] = mail.value;
            mailItems.forEach((email) => {
                email.folder = displayName;
            });
            console.log('[GraphService] getUserEmails mailItems: ', mailItems);
            return mailItems;
        }
    }




    public async getOtherEmails(): Promise<EmailResponse[]> {
        this.ensureClient();
        const isClientInitialized = await this.isClientInitialized();

        if (!isClientInitialized) {
            throw new Error('Graph client is not initialized.');
        } else {
            const mail = await this.graphClient
            .api(`/me/messages?$select=id,receivedDateTime,subject,from&$filter=inferenceClassification eq 'other'`)
            .top(50)
                .get();

            const mailItems: EmailResponse[] = mail.value;
            console.log('[GraphService] getOtherEmails mailItems: ', mailItems);
            return mailItems;
        }
    }


    /**
     * @description Update email as read
     */
    public async messageRead(messageId: string) {
        this.ensureClient();
        const isClientInitialized = await this.isClientInitialized();

        if (!isClientInitialized) {
            throw new Error('Graph client is not initialized.');
        } else {
            await this.graphClient
                .api(`/me/messages/${messageId}`)
                .patch({
                    isRead: true,
                })
                .then((res) => {
                    console.log('[GraphService] messageRead email marked as read', res);
                })
                .catch((error) => {
                    console.error('[GraphService] messageRead error', error);
                });
        }
    }

    /**
     * @description Flag email as important
     */
    public async messageFlagged(messageId: string, flaggedStatus: string) {
        this.ensureClient();
        const isClientInitialized = await this.isClientInitialized();

        if (!isClientInitialized) {
            throw new Error('Graph client is not initialized.');
        } else {
            await this.graphClient
                .api(`/me/messages/${messageId}`)
                .patch({
                    flag: {
                        flagStatus: flaggedStatus,
                    },
                })
                .then((res) => {
                    console.log('[GraphService] messageFlagged email flagged', res);
                })
                .catch((error) => {
                    console.error('[GraphService] messageFlagged error', error);
                });
        }
    }

    /**
     * @description Sends a new email to the specified recipient.
     */
    public async sendNewEmail(email: NewEmail): Promise<void> {
        this.ensureClient();
        const isClientInitialized = await this.isClientInitialized();

        console.log('[GraphService] sendNewEmail email: { PARAMETER }', email);

        if(!email.message.ccRecipients[0].emailAddress.address) {
            //@ts-ignore
            email.message.ccRecipients = [];
        } 

        if (!isClientInitialized) {
            throw new Error('Graph client is not initialized.');
        } else {
            await this.graphClient
                .api('/me/sendMail')
                .post(email)
                .then((res) => {
                    console.log('[GraphService] sendNewEmail email sent', res);
                })
                .catch((error) => {
                    console.error('[GraphService] sendNewEmail error', error);
                });
        }
    }

    /**
     * @description Send a reply message to the specified email.
     */
    public async replyToEmail(email: NewEmail, emailId: string): Promise<void> {
        this.ensureClient();
        const isClientInitialized = await this.isClientInitialized();

        console.log('[GraphService] replyToEmail email: { PARAMETER }', email);
        console.log({'[GraphService] replyToEmail emailId': emailId});

        if(!email.message.ccRecipients[0].emailAddress.address) {
            //@ts-ignore
            email.message.ccRecipients = [];
        } 

        if (!isClientInitialized) {
            throw new Error('Graph client is not initialized.');
        } else {
            await this.graphClient
                .api(`/me/messages/${emailId}/reply`)
                .post(email)
                .then((res) => {
                    console.log('[GraphService] replyToEmail email sent', res);
                })
                .catch((error) => {
                    console.error('[GraphService] replyToEmail error', error);
                });
        }
    }

    /**
     *  @description Deletes specific email from user's mailbox
     */
    public async deleteEmail(emailId: string): Promise<void> {
        this.ensureClient();
        const isClientInitialized = await this.isClientInitialized();

        if (!isClientInitialized) {
            throw new Error('Graph client is not initialized.');
        } else {
            await this.graphClient.api(`/me/messages/${emailId}`).delete();
        }
    }

    /* ----------------------------------------------------- */
    /* --------------- FOLDER RELATED METHODS -------------- */
    /* ----------------------------------------------------- */
    /**
     * @description Get user emails from Microsoft Graph API
     */
    public async getMailFolders(): Promise<any> {
        this.ensureClient();
        const isClientInitialized = await this.isClientInitialized();

        if (!isClientInitialized) {
            throw new Error('Graph client is not initialized.');
        } else {
            const folders = await this.graphClient.api('/me/mailFolders').get();

            const mailFolders = folders.value;
            console.log('[GraphService] getMailFolders folders: ', mailFolders);
            return mailFolders;
        }
    }
}
