'use client';
import GPTSettings from './settings/gptSettings'
import GPTTextArea from './textarea/gptTextArea';
import styles from './gpt.module.css'
import { GptProvider } from './GptContext';

export default function GPTInterface(): JSX.Element {
    return (
        <GptProvider>
            <section className={styles.gpt_container}>
                <div className={styles.gpt_settings}>
                    <GPTSettings />
                </div>
                <div className={styles.gpt_textarea}>
                    <GPTTextArea />
                </div>
            </section>
        </GptProvider>
    )
}
