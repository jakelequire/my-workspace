import Email from './email'
import styles from './email.module.css'


export default function EmailInterface(): JSX.Element {
    return (
        <section className={styles.email_container}>
            <Email />
        </section>
    )
}
