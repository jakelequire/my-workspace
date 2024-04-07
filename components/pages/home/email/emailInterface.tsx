'use client';
import Email from './email'
import styles from './email.module.css'
import ProvideAppContext from './AppContext'
import { EmailProvider } from './EmailContext';
import { MsalProvider } from '@azure/msal-react'
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './graphApi/Config';

// Create an instance of PublicClientApplication
const pca = new PublicClientApplication(msalConfig);

export default function EmailInterface(): JSX.Element {

    return (
        <MsalProvider instance={pca}>
            <ProvideAppContext>
                <EmailProvider>
                    <section className={styles.email_container}>
                        <Email />
                    </section>
                </EmailProvider>
            </ProvideAppContext>
        </MsalProvider>
    )
}

