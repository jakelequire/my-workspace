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
        todoItem,
        submissionCount,
        clearFields,
        addTodoItem,
        setTodoItem,
        setSubmissionCount,
    } = useTaskContext();

    const handleAddTask = async () => {
        // format(date, 'PP')
        // Date format: Mar 1, 2022
        const date = new Date();
        const formattedDate = format(date, 'PP');

        const newTask: Todo.DbTodoItem = {
            title: todoItem.title,
            priority: todoItem.priority,
            category: todoItem.category,
            description: todoItem.description,
            completed: todoItem.completed,
            status: todoItem.status,
            started: formattedDate,
            due: todoItem.due,
        };

        const response = await sendTask(newTask);
        if (response) { // Verify response structure matches expected TodoItem
            console.log("Adding todo item:", response);
            clearFields();
            addTodoItem(response);
            setSubmissionCount(submissionCount + 1);
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
                        value={todoItem.title}
                        onChange={(e) => (setTodoItem({ ...todoItem, title: e.target.value }))}
                        className={`${styles.taskinput_input} ${styles.textarea_title} `}
                    />
                    <Input
                        type='textarea'
                        placeholder='Enter a description for the task'
                        value={todoItem.description}
                        onChange={(e) => (setTodoItem({ ...todoItem, description: e.target.value }))}
                        className={`${styles.taskinput_input} ${styles.textarea_description}`}
                    />
                </div>
                <div className={styles.datainfo}>
                    <div className={styles.taskinput_duedate}>
                        <CalendarInput key={submissionCount} />
                    </div>
                    <div className={styles.taskinput_priority}>
                        <Priority />
                    </div>
                    <div className={styles.taskinput_category}>
                        <Category />
                    </div>
                </div>
                <div className={styles.button_container}>
                    <Button type='submit' className={`${styles.taskinput_button}`} onClick={handleAddTask}>
                        Add Task
                    </Button>
                </div>
            </div>
        </div>
    );
}
