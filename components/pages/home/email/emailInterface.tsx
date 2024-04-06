'use client';
import Email from './email'
import styles from './email.module.css'
import ProvideAppContext from './EmailContext'
import { MsalProvider } from '@azure/msal-react'
import { PublicClientApplication } from '@azure/msal-browser';

// MSAL configuration
const msalConfig = {
    auth: {
        clientId: '1cf6318d-254e-4e01-bf91-9bc3e25dd772',
        authority: 'https://login.microsoftonline.com/common',
        redirectUri: 'http://localhost:3000/home/email',
        clientSecret: '1c1b5a6d-c730-4fde-96a4-35e721cc3812',
        navigateToLoginRequestUrl: true,
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false,
    },
};

// Create an instance of PublicClientApplication
const pca = new PublicClientApplication(msalConfig);

export default function EmailInterface(): JSX.Element {

    return (
        <MsalProvider instance={pca}>
            <ProvideAppContext>
                <section className={styles.email_container}>
                    <Email />
                </section>
            </ProvideAppContext>
        </MsalProvider>
    )
}
