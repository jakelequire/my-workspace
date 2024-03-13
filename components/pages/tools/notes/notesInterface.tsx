"use client"
import Notepad from './notepad/notepad'
import Toolbar from './notepad/toolbar'

import styles from './notes.module.css'

export default function NotesInterface(): JSX.Element {
    return (
        <section className={styles.notes_container}>
            <div className={styles.notes_explorer}>

            </div>
            <div className={styles.notes_editor}>
                <div className={styles.editor_toolbar}>
                    <Toolbar />
                </div>
                <div className={styles.editor_content}>
                    <Notepad />
                </div>
            </div>
        </section>
    )
}
