'use client';
import Navigator from './navigator';
import { BudgetingProvider } from './BudgetingContext';
import styles from './budgeting.module.css'

export default function BudgetingInterface(): JSX.Element {
    return (
        <BudgetingProvider>
            <section className={styles.budgeting_container}>
                <Navigator />
            </section>
        </BudgetingProvider>
    )
}
