"use client"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CalendarInput from './calendar';
import Priority from './priority';
import Category from './category';

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
            <div className={styles.taskinput_header}>
                <h2 className={styles.taskinput_title}>Create New Task</h2>
            </div>
            <div className={styles.taskinput_wrapper}>
                <div className={styles.taskinput_form}>
                    <Input
                        type='text'
                        placeholder='Enter a title for the task'
                        className={`${styles.taskinput_input} ${styles.textarea_title}`}
                    />
                    <Input
                        type='textarea'
                        placeholder='Enter a description for the task'
                        className={`${styles.taskinput_input} ${styles.textarea_description}`}
                    />
                </div>
                <div className={styles.datainfo}>
                    <div className={styles.taskinput_duedate}>
                        <CalendarInput />
                    </div>
                    <div className={styles.taskinput_priority}>
                        <Priority />
                    </div>
                    <div className={styles.taskinput_category}>
                        <Category />
                    </div>
                </div>
                <div className={styles.button_container}>
                    <Button type='submit' className={styles.taskinput_button}>Add Task</Button>
                </div>
            </div>
        </div>
    );
}
