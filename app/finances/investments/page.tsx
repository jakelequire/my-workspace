import Navbar from '@/components/misc/navbar/navbar';
import InvestmentsInterface from '@/components/pages/finances/investments/investmentsInterface';
import styles from '../../page.module.css';

export default function Investments() {
    return (
        <main className={styles.main}>
            <Navbar />
            <InvestmentsInterface />
        </main>
    );
}
