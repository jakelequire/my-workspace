import Navbar from '@/components/misc/navbar/navbar';
import BankingInterface from '@/components/pages/finances/banking/bankingInterface';
import styles from '../../page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Banking | Jakes Workspace',
};
export default function Banking() {
    return (
        <main className={styles.main}>
            <Navbar />
            <BankingInterface />
        </main>
    );
}
