'use client';
import { CodeSpaceProvider } from './CodeSpaceContext'
import CodeSpaceNav from './navigation/codespaceNav';
import styles from './code.module.css'


export default function CodeSpaceInterface(): JSX.Element {


    return (
        <CodeSpaceProvider>
            <section className={styles.codespace_container}>
                <div className={styles.codespace_wrapper}>
                    <div className={styles.header_container}>
                        <h1 className={styles.header}>Code Space</h1>
                    </div>
                    <div className={styles.content_container}>
                        <CodeSpaceNav />
                    </div>
                </div>
            </section>
        </CodeSpaceProvider>
    )
}
