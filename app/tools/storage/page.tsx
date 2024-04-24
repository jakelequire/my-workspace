import StorageInterface from '@/components/pages/tools/storage/storageInterface';
import styles from '../../page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cloud Storage | Jakes Workspace',
};
export default function Storage() {
    return (
        <main className={styles.main}>
            <StorageInterface />
        </main>
    );
}
