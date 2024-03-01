import { DataTable } from './datatable/datatable'
import TaskInput from './taskInput/taskInput'
import styles from './tasks.module.css'


export default function TasksInterface(): JSX.Element {


    return (
        <section className={styles.tasks_container}>
            <div className={styles.tasks_wrapper}>
                <TaskInput />
                <DataTable />
            </div>
        </section>
    )
}