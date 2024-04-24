import BudgetingInterface from '@/components/pages/finances/budgeting/budgetingInterface';
import styles from '../../page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Budgeting | Jakes Workspace',
};
export default function Budgeting() {
    return (
        <main className={styles.main}>
            <BudgetingInterface />
        </main>
    );
}
