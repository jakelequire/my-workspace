import IndexInterface from '@/components/pages/index/indexInterface';
import Navbar from '@/components/misc/navbar/navbar';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard | Jakes Workspace',
};

export default function Home() {
    return (
        <main className={styles.main}>
            <Navbar />
            <IndexInterface />
        </main>
    );
}
