import LoginInterface from '@/components/pages/login/loginInterface';
import Navbar from '@/components/misc/navbar/navbar';
import styles from '../page.module.css';

export default function Login() {
    return (
        <main className={styles.main}>
            <Navbar />
            <LoginInterface />
        </main>
    );
}
