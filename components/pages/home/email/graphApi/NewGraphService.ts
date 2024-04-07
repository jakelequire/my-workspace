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

    public async getUserEmails(): Promise<any> {
        this.ensureClient();
        const isClientInitialized = await this.isClientInitialized();

        if(!isClientInitialized) {
            throw new Error('Graph client is not initialized.');
        } else {
            const mail = await this.graphClient.api('/me/messages')
                .get();
            
            const mailItems: EmailResponse[] = mail.value;
            //console.log('[GraphService] getUserEmails mail: ', mail);
            console.log("[GraphService] getUserEmails mailItems: ", mailItems);
            return mail;
        }
    }
}
