import Navbar from '@/components/misc/navbar/navbar';
import EmailInterface from '@/components/pages/home/email/emailInterface';
import styles from '../../page.module.css';
import { IPublicClientApplication } from '@azure/msal-browser';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Email | Jakes Workspace',
};

type AppProps = {
    pca: IPublicClientApplication
};

export default function Email() {
    return (
        <main className={styles.main}>
            <Navbar />
            <EmailInterface />
        </main>
    );
}
