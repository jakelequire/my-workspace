'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CalendarInput from './calendar';
import Priority from './priority';
import Category from './category';
import { useTaskContext } from '../TaskContext';
import { Todo } from '@/types/types';
import { format } from 'date-fns';

import styles from './taskInput.module.css';

export default function TaskInput(): JSX.Element {
    const {
        setId,
        setTitle,
        setDescription,
        setStarted,
        clearFields,
        addTodoItem,
        title,
        priority,
        category,
        description,
        completed,
        status,
        started,
        due,
    } = useTaskContext();

    const handleAddTask = async () => {
        // format(date, 'PP')
        // Date format: Mar 1, 2022
        const date = new Date();
        const formattedDate = format(date, 'PP');
        /*DEBUG*/ console.log("Formatted Date: ", formattedDate);
        setStarted(formattedDate);
        
        const newTask: Todo.DbTodoItem = {
            title,
            priority,
            category,
            description,
            completed,
            status,
            started: formattedDate,
            due,
        };

        const response = await sendTask(newTask);
        if (response && response.id) { // Verify response structure matches expected TodoItem
            addTodoItem(response);
            clearFields();
        } else {
            console.error("Failed to add new task, response:", response);
        }
    };

    const sendTask = async (task: Todo.DbTodoItem) => {
        // Send the task to the server endpoint /api/firestore
        const sendRequest = await fetch('/api/firestore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        const response: Todo.AddTodoServerResponse = await sendRequest.json()
        return response;
    }

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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`${styles.taskinput_input} ${styles.textarea_title}`}
                    />
                    <Input
                        type='textarea'
                        placeholder='Enter a description for the task'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                    <Button type='submit' className={styles.taskinput_button} onClick={handleAddTask}>
                        Add Task
                    </Button>
                </div>
            </div>
        </div>
    );
}
