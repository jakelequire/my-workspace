'use client';
import styles from './index.module.css'
import { ReposProvider } from './ReposContext'


export default function IndexInterface(): JSX.Element {


    return (
        <ReposProvider>
            <section className={styles.repos_container}>
                {/*  */}
            </section>
        </ReposProvider>
    )
}
