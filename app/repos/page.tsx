import ReposInterface from '@/components/pages/repos/reposInterface'
import styles from '../page.module.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Repositories | Jakes Workspace',
};

export default function Repos() {
    return (
        <main className={styles.main}>
            <ReposInterface />
        </main>
    );
}


