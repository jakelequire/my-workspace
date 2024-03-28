import Navbar from '@/components/misc/navbar/navbar';
import CodeSpaceInterface from '@/components/pages/home/code_space/codespaceInterface';
import styles from '../../page.module.css';

export default function Code() {
    return (
        <main className={styles.main}>
            <Navbar />
            <CodeSpaceInterface />
        </main>
    );
}
