'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import StartDateCalendar from './startCalendar';
import CalendarInput from './dueCalendar';
import Priority from './priority';
import Category from './category';

import { useTaskContext } from '../TaskContext';
import { useGlobalContext } from '@/components/GlobalContext';
import { Todo } from '@/types/types';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from "@/components/ui/separator"

import styles from './taskInput.module.css';
import { Label } from '@/components/ui/label';

export default function TaskInput(): JSX.Element {
    const { todoItem, clearFields, addTodoItem, setTodoItem } = useTaskContext();
    const { submissionCount } = useGlobalContext();

    const handleAddTask = async () => {
        const newTask: Todo.DbTodoItem = {
            title: todoItem.title,
            priority: todoItem.priority,
            category: todoItem.category,
            description: todoItem.description,
            completed: todoItem.completed,
            status: todoItem.status,
            started: todoItem.started,
            due: todoItem.due,
        };

        clearFields();
        addTodoItem(newTask);
    };

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
                        onChange={(e) => setTodoItem({ ...todoItem, title: e.target.value })}
                        className={`${styles.taskinput_input} ${styles.textarea_title} `}
                    />
                    <Textarea
                        placeholder='Enter a description for the task'
                        value={todoItem.description}
                        onChange={(e) => setTodoItem({ ...todoItem, description: e.target.value })}
                        className={`${styles.taskinput_input} ${styles.textarea_description} resize-none`}
                    />
                </div>
                <Separator orientation='vertical' />
                <div className={styles.datainfo}>

                    <div className={styles.date_wrapper}>
                        <div className={styles.taskinput_duedate}>
                            <Label>Start Date</Label>
                            <StartDateCalendar key={submissionCount} />
                        </div>
                        <div className={styles.taskinput_duedate}>
                            <CalendarInput key={submissionCount} />
                        </div>
                    </div>

                    <div className={styles.type_wrapper}>
                        <div className={styles.taskinput_priority}>
                            <Priority />
                        </div>
                        <div className={styles.taskinput_category}>
                            <Category />
                        </div>
                    </div>

                </div>
                <div className={styles.button_container}>
                    <Button
                        type='submit'
                        className={`${styles.taskinput_button}`}
                        onClick={() => {
                            handleAddTask()
                                .then(() => {
                                    toast.success('A new task has been created.', {
                                        description: `Task: ${todoItem.title} has been added to the list.`,
                                        duration: 2000,
                                    });
                                })
                                .catch((error) => {
                                    toast.error('An error occurred.', {
                                        description: error.message,
                                        duration: 2000,
                                    });
                                });
                        }}>
                        Add Task
                    </Button>
                </div>
            </div>
        </div>
    );
}
