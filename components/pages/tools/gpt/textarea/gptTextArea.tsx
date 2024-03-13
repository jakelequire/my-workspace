import Response from './response';
import InputContainer from './input';
import styles from './gptTextArea.module.css';


export default function GPTTextArea(): JSX.Element {

    return (
        <div className={styles.gpt_textarea}>
            <div className={styles.response_container}>
                <Response />
            </div>
            <div className={styles.input_container}>
                <InputContainer />
            </div>
        </div>
    )
}
