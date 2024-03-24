'use client';
import Notepad from './notepad/editor/notepad';
import Toolbar from './notepad/toolbar/toolbar';
import NotepadTabs from './notepad/tabs/notepadTabs';
import NotepadExplorer from './notepad/file_explorer/notepadExplorer';
import { NotepadProvider } from './NotepadContext';
import styles from './notes.module.css';

export default function NotesInterface(): JSX.Element {
    return (
        <NotepadProvider>
            <section className={styles.notes_container}>
                <div className={styles.notes_wrapper}>
                    <div className={styles.notes_explorer}>
                        <NotepadExplorer />
                    </div>
                    <div className={styles.notes_editor}>
                        <div className={styles.editor_content}>
                            <div className={styles.editor_toolbar}>
                                <Toolbar />
                            </div>
                            <div className={styles.editor_tabs}>
                                <NotepadTabs />
                            </div>
                            <div className={styles.editor}>
                                <Notepad />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </NotepadProvider>
    );
}
