import {
    Client,
    GraphRequestOptions,
    PageCollection,
    PageIterator,
} from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { endOfWeek, startOfWeek } from 'date-fns';
import { User, Event } from '@microsoft/microsoft-graph-types';
import { EmailResponse } from '../types'
import { NewEmail } from '../EmailContext';

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
    /**
     * @description Get user emails from Microsoft Graph API
     */
    public async getUserEmails(folderId: string, displayName: string): Promise<EmailResponse[]> {
        this.ensureClient();
        const isClientInitialized = await this.isClientInitialized();

        if(!isClientInitialized) {
            throw new Error('Graph client is not initialized.');
        } else {
            const mail = await this.graphClient.api(`/me/mailFolders/${folderId}/messages`)
                // .filter(`inferenceClassification eq 'focused'`)
                .top(50)
                .get();
            
            const mailItems: EmailResponse[] = mail.value;
            mailItems.forEach((email) => {
                email.folder = displayName;
            })
            console.log("[GraphService] getUserEmails mailItems: ", mailItems);
            return mailItems;
        }
    }

    /**
     * @description Update email as read
     */
    public async messageRead(messageId: string) {
        this.ensureClient();
        const isClientInitialized = await this.isClientInitialized();

        if(!isClientInitialized) {
            throw new Error('Graph client is not initialized.');
        } else {
            await this.graphClient.api(`/me/messages/${messageId}`)
                .patch({
                    isRead: true,
                }).then((res) => {
                    console.log("[GraphService] messageRead email marked as read", res);
                }).catch((error) => {
                    console.error("[GraphService] messageRead error", error);
                })
        }
    }


    public async sendNewEmail(email: NewEmail): Promise<void> {
        this.ensureClient();
        const isClientInitialized = await this.isClientInitialized();

        console.log("[GraphService] sendNewEmail email: ", email)

        if(!isClientInitialized) {
            throw new Error('Graph client is not initialized.');
        } else {
            await this.graphClient.api('/me/sendMail')
                .post(email)
                .then((res) => {
                    console.log("[GraphService] sendNewEmail email sent", res);
                })
                .catch((error) => {
                    console.error("[GraphService] sendNewEmail error", error);
                });
        }
    }

    /**
     *  @description Deletes specific email from user's mailbox
     */
    public async deleteEmail(emailId: string): Promise<void> {
        this.ensureClient();
        const isClientInitialized = await this.isClientInitialized();

        if(!isClientInitialized) {
            throw new Error('Graph client is not initialized.');
        } else {
            await this.graphClient.api(`/me/messages/${emailId}`)
                .delete();
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

        if(!isClientInitialized) {
            throw new Error('Graph client is not initialized.');
        } else {
            const folders = await this.graphClient.api('/me/mailFolders')
                .get();
            
            const mailFolders = folders.value;
            console.log("[GraphService] getMailFolders folders: ", mailFolders);
            return mailFolders;
        }
    }

}
