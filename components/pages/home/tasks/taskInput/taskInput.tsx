"use client"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import styles from './taskInput.module.css';

export type TodoItem = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    status: 'not started' | 'in-progress' | 'completed';
    started: string;
    due: string;
};


export default function TaskInput(): JSX.Element {

    return (
        <div className={styles.taskinput_container}>
            <div className={styles.taskinput_wrapper}>
                <div className={styles.taskinput_form}>
                    <Input
                        type='text'
                        placeholder='Enter a title for the task'
                        className={styles.taskinput_input}
                    />
                    <Input
                        type='textarea'
                        placeholder='Enter a description for the task'
                        className={styles.taskinput_input}
                    />



                    <Button type='submit' className={styles.taskinput_button} />
                </div>
            </div>
        </div>
    );
}
