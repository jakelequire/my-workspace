import LoginInterface from '@/components/pages/login/loginInterface';
import styles from '../page.module.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login | Jakes Workspace',
};

export default function Login() {
    return (
        <main className={styles.main}>
            <LoginInterface />
        </main>
    );
}
