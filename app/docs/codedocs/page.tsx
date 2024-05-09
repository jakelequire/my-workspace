import CodeDocsInterface from '@/components/pages/docs/code_docs/codeDocsInterface';
import styles from '../../page.module.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Documentation | Jakes Workspace',
};

export default function Docs() {
    return (
        <main className={styles.main}>
            <CodeDocsInterface />
        </main>
    );
}

