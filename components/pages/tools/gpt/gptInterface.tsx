'use client';
import GPTSettings from './settings/gptSettings'
import GPTTextArea from './textarea/gptTextArea';
import styles from './gpt.module.css'
import { GPTProvider } from './GptContext';

export default function GPTInterface(): JSX.Element {
    return (
        <GPTProvider>
            <section className={styles.gpt_container}>
                <div className={styles.gpt_settings}>
                    <GPTSettings />
                </div>
                <div className={styles.gpt_textarea}>
                    <GPTTextArea />
                </div>
            </section>
        </GPTProvider>
    )
}
