import Navbar from '@/components/misc/navbar/navbar';
import EmailInterface from '@/components/pages/home/email/emailInterface';
import styles from '../../page.module.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Email | Jakes Workspace',
};
export default function Home() {
    return (
        <main className={styles.main}>
            <Navbar />
            <EmailInterface />
        </main>
    );
}
