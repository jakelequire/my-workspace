import Navbar from '@/components/misc/navbar/navbar';
import EmailInterface from '@/components/pages/home/email/emailInterface';
import styles from '../../page.module.css';

export default function Home() {
    return (
        <main className={styles.main}>
            <Navbar />
            <EmailInterface />
        </main>
    );
}
