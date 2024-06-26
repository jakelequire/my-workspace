'use client'
import React, { useContext, createContext, useState, MouseEventHandler, useEffect } from 'react';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication, InteractionStatus } from '@azure/msal-browser';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { getUser, getUserEmails } from './graphApi/GraphService';
import GraphService from './graphApi/NewGraphService';

import config from './graphApi/Config';

// <AppContextSnippet>
export interface AppUser {
    displayName?: string;
    email?: string;
    avatar?: string;
    timeZone?: string;
    timeFormat?: string;
}

export interface AppError {
    message: string;
    debug?: string;
}

type AppContext = {
    user?: AppUser;
    error?: AppError;
    signIn?: MouseEventHandler<HTMLElement>;
    signOut?: MouseEventHandler<HTMLElement>;
    displayError?: Function;
    clearError?: Function;
    authProvider?: AuthCodeMSALBrowserAuthenticationProvider;
};

const appContext = createContext<AppContext>({
    user: undefined,
    error: undefined,
    signIn: undefined,
    signOut: undefined,
    displayError: undefined,
    clearError: undefined,
    authProvider: undefined,
});

export function useAppContext(): AppContext {
    return useContext(appContext);
}

interface ProvideAppContextProps {
    children: React.ReactNode;
}

export default function ProvideAppContext({ children }: ProvideAppContextProps) {
    const auth = useProvideAppContext();
    return <appContext.Provider value={auth}>{children}</appContext.Provider>;
}
// </AppContextSnippet>

function useProvideAppContext() {
    const msal = useMsal();
    const [user, setUser] = useState<AppUser | undefined>(undefined);
    const [error, setError] = useState<AppError | undefined>(undefined);

    const displayError = (message: string, debug?: string) => {
        setError({ message, debug });
    };

    const clearError = () => {
        setError(undefined);
    };


    // <AuthProviderSnippet>
    // Used by the Graph SDK to authenticate API calls
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
        msal.instance as PublicClientApplication,
        {
            account: msal.instance.getActiveAccount()!,
            scopes: config.scopes,
            interactionType: InteractionType.Popup,
        }
    );
    // </AuthProviderSnippet>

    const graphService = new GraphService(authProvider);
    const { instance, inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    
    // <UseEffectSnippet>
    useEffect(() => {
        const checkUser = async () => {
            console.log("[EmailContext] user: ", user)
            if (!user) {
                try {
                    // Check if user is already signed in
                    const account = msal.instance.getActiveAccount();
                    console.log("[EmailContext] account: ", account);
                    if (account) {
                        // Get the user from Microsoft Graph using GraphService instance
                        const graphUser = await graphService.getUser();
                        console.log("[EmailContext] user: ", graphUser);
                        setUser({
                            displayName: graphUser.displayName || '',
                            email: graphUser.mail || graphUser.userPrincipalName || '',
                            timeFormat: graphUser.mailboxSettings?.timeFormat || 'h:mm a',
                            timeZone: graphUser.mailboxSettings?.timeZone || 'UTC',
                        });
                    }
                } catch (err: any) {
                    displayError(err.message);
                }
            }
        };
        if (!isAuthenticated && inProgress === InteractionStatus.None) {
            console.log("[AppContext] {if} useEffect: ", isAuthenticated, inProgress)
        } else {
            console.log("[AppContext] {else} useEffect: ", isAuthenticated, inProgress)
        }
        checkUser();
    });
    // </UseEffectSnippet>

    // <SignInSnippet>
    const signIn = async () => {
        const loginPopup = await msal.instance.loginPopup({
            scopes: config.scopes,
            prompt: 'select_account',
        });

        if (!loginPopup) {
            return;
        } else {
            loginPopup.account && msal.instance.setActiveAccount(loginPopup.account);
        }

        // Get the user from Microsoft Graph using GraphService instance
        const graphUser = await graphService.getUser();
        console.log("[EmailContext] user: ", graphUser);

        setUser({
            displayName: graphUser.displayName || '',
            email: graphUser.mail || graphUser.userPrincipalName || '',
            timeFormat: graphUser.mailboxSettings?.timeFormat || '',
            timeZone: graphUser.mailboxSettings?.timeZone || 'UTC',
        });
    };
    // </SignInSnippet>

    // <SignOutSnippet>
    const signOut = async () => {
        await msal.instance.logoutPopup();
        setUser(undefined);
    };
    // </SignOutSnippet>

    return {
        user,
        error,
        signIn,
        signOut,
        displayError,
        clearError,
        authProvider,
    };
}
