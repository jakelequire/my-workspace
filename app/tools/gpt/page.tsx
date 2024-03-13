import Navbar from '@/components/misc/navbar/navbar';
import GPTInterface from '@/components/pages/tools/gpt/gptInterface';
import styles from '../../page.module.css';

export default function Gpt() {
    return (
        <main className={styles.main}>
            <Navbar />
            <GPTInterface />
        </main>
    );
}
