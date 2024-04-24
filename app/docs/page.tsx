import DocsInterface from '@/components/pages/docs/docsInterface'
import styles from '../page.module.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Documentation | Jakes Workspace',
};

export default function Docs() {
    return (
        <main className={styles.main}>
            <DocsInterface />
        </main>
    );
}


