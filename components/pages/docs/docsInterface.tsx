'use client';
import { DocsProvider } from './DocsContext';
import styles from './docs.module.css'


export default function DocsInterface(): JSX.Element {

    return (
        <DocsProvider>
            <section className={styles.docs_container}>
                {/*  */}
            </section>
        </DocsProvider>
    )
}
