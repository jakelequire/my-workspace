'use client';
import Navigator from './navigator';
import styles from './budgeting.module.css'

export default function BudgetingInterface(): JSX.Element {
    return (
        <section className={styles.budgeting_container}>
            <Navigator />
        </section>
    )
}
