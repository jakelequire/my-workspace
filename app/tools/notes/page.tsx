import Navbar from '@/components/misc/navbar/navbar';
import NotesInterface from '@/components/pages/tools/notes/notesInterface';
import styles from '../../page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Notes | Jakes Workspace',
};
export default function Notes() {
    return (
        <main className={styles.main}>
            <Navbar />
            <NotesInterface />
        </main>
    );
}
