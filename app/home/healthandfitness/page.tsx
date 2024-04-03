import Navbar from '@/components/misc/navbar/navbar';
import HealthAndFitnessInterface from '@/components/pages/home/health_and_fitness/healthAndFitnessInterface';
import styles from '../../page.module.css';

export default function HealthAndFitness() {
    return (
        <main className={styles.main}>
            <Navbar />
            <HealthAndFitnessInterface />
        </main>
    );
}
