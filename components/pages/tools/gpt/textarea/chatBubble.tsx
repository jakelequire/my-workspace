import React from 'react';
import Image from 'next/image';
import styles from './gptTextArea.module.css';
import _gptIcon from '@/public/assets/chatgpt.svg';
import _userIcon from '@/public/assets/user.svg';

type ChatBubbleProps = {
    type: 'user' | 'gpt';
    content: string;
    isLoading?: boolean;
};

export default function ChatBubble({ type, content, isLoading }: ChatBubbleProps): JSX.Element {
    const isGpt = type === 'gpt';
    
    return (
        <div className={`${styles.chat_bubble} ${isGpt ? styles.gpt_bubble : styles.user_bubble}`}>
            {isGpt ? (
                <div className={styles.gpt_icon_wrapper}>
                    <Image src={_gptIcon} alt='ChatGPT' width={24} height={24} />
                    <p className={styles.gpt_icon_text}>ChatGPT</p>
                </div>
            ): (
                <div className={styles.gpt_icon_wrapper}>
                    <Image src={_userIcon} alt='You' width={24} height={24} />
                    <p className={styles.gpt_icon_text}>You</p>
                </div>
            )}
            <p className={styles.chat_text}>{content}</p>
        </div>
    );
}
