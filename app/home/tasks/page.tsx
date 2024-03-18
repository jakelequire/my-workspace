import TasksInterface from '@/components/pages/home/tasks/tasksInterface';
import Navbar from '@/components/misc/navbar/navbar';
import styles from '../../page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Todo | Jakes Workspace',
};

export default function Tasks() {
    return (
        <main className={styles.main}>
            <Navbar />
            <TasksInterface />
        </main>
    );
}
