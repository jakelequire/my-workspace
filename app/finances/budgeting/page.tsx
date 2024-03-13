import Navbar from '@/components/misc/navbar/navbar';
import BudgetingInterface from '@/components/pages/finances/budgeting/budgetingInterface';
import styles from '../../page.module.css';

export default function Budgeting() {
    return (
        <main className={styles.main}>
            <Navbar />
            <BudgetingInterface />
        </main>
    );
}
