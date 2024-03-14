'use client';
import * as React from 'react';
import InputContainer from './input';
import styles from './gptTextArea.module.css';
import { useGptContext } from '../GptContext';
import { ScrollArea } from "@/components/ui/scroll-area"
import ChatBubble from './chatBubble';

export default function GPTTextArea(): JSX.Element {
    const { conversations } = useGptContext();

    return (
        <div className={styles.gpt_textarea}>
            <ScrollArea className="h-[80%] w-[100%] rounded-md border">
            <div className={styles.response_container}>
                {conversations.map((conv, index) => (
                    <React.Fragment key={conv.id}>
                        <ChatBubble type='user' content={conv.message} />
                        {conv.responses.length > 0 && (
                            <ChatBubble
                                type='gpt'
                                content={conv.responses.join('')}
                                isLoading={conv.isLoading}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
            </ScrollArea>
            <div className={styles.input_container}>
                <InputContainer />
            </div>
        </div>
    );
}
