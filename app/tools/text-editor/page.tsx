import TextEditorInterface from '@/components/pages/tools/texteditor/texteditorInterface';
import styles from '../../page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Text Editor | Jakes Workspace',
};
export default function TextEditor() {
    return (
        <main className={styles.main}>
            <TextEditorInterface />
        </main>
    );
}
