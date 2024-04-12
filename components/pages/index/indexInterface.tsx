'use client';
import Dashboard from './dashboard/dashboard'
import styles from './index.module.css'
import { DashboardProvider } from './DashboardContext'


export default function IndexInterface(): JSX.Element {


    return (
        <DashboardProvider>
            <section className={styles.index_container}>
                <Dashboard />
            </section>
        </DashboardProvider>
    )
}
