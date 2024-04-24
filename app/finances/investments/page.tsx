import InvestmentsInterface from '@/components/pages/finances/investments/investmentsInterface';
import styles from '../../page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Investments | Jakes Workspace',
};
export default function Investments() {
    return (
        <main className={styles.main}>
            <InvestmentsInterface />
        </main>
    );
}
