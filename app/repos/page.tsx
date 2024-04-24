import ReposInterface from '@/components/pages/repos/reposInterface'
import Navbar from '@/components/misc/navbar/navbar';
import styles from '../page.module.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Repositories | Jakes Workspace',
};

export default function Repos() {
    return (
        <main className={styles.main}>
            <Navbar />
            <ReposInterface />
        </main>
    );
}


