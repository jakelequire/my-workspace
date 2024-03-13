import Navbar from '@/components/misc/navbar/navbar';
import TextEditorInterface from '@/components/pages/tools/texteditor/texteditorInterface';
import styles from '../../page.module.css';

export default function TextEditor() {
    return (
        <main className={styles.main}>
            <Navbar />
            <TextEditorInterface />
        </main>
    );
}
