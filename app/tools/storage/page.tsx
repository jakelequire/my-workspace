import Navbar from '@/components/misc/navbar/navbar';
import StorageInterface from '@/components/pages/tools/storage/storageInterface';
import styles from '../../page.module.css';

export default function Storage() {
    return (
        <main className={styles.main}>
            <Navbar />
            <StorageInterface />
        </main>
    );
}
