import DocsInterface from '@/components/pages/docs/docsInterface'
import Navbar from '@/components/misc/navbar/navbar';
import styles from '../page.module.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Documentation | Jakes Workspace',
};

export default function Docs() {
    return (
        <main className={styles.main}>
            <Navbar />
            <DocsInterface />
        </main>
    );
}


