'use client';
import { DataTable } from './datatable/datatable';
import TaskInput from './taskInput/taskInput';
import styles from './tasks.module.css';
import { TaskProvider } from './TaskContext';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function TasksInterface(): JSX.Element {
    return (
        <TaskProvider>
            <ScrollArea className='w-[100%] h-[100%]'>
                <section className={styles.tasks_container}>
                    <div className={styles.tasks_wrapper}>
                        <TaskInput />
                        <div className={styles.tasks_header}>
                            <h2 className={styles.tasks_title}>Tasks</h2>
                        </div>
                        <DataTable />
                    </div>
                </section>
            </ScrollArea>
        </TaskProvider>
    );
}
