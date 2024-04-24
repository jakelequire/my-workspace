import IndexInterface from '@/components/pages/index/indexInterface';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard | Jakes Workspace',
};

export default function Home() {
    return (
        <main className={styles.main}>
            <IndexInterface />
        </main>
    );
}
