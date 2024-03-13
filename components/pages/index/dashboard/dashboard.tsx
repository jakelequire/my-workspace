'use client';
import { TodoWidget } from './widget/todoWidget';
import { DashNav } from './navigation/dashNav';
import MiniTodo from './widget/miniTodo';
import styles from './dashboard.module.css';

export default function Dashboard(): JSX.Element {

    return (
        <div className={styles.dashboard_container}>
            <div className={styles.header_container}>
                <div className={styles.header_title_wrapper}>
                    <h1 className={styles.header}>
                        Dashboard
                    </h1>
                </div>
                <div className={styles.navigator_container}>
                    <div className={styles.navbar_wrapper}>
                        <DashNav />
                    </div>
                    <div className={styles.profile_wrapper}>

                    </div>
                </div>
            </div>

            <div className={styles.top_widget_container}>
                <div className={styles.mini_widget_one}>

                </div>
                <div className={styles.mini_widget_two}>

                </div>
                <div className={styles.mini_widget_three}>

                </div>
                <div className={styles.mini_widget_four}>
                    <MiniTodo />

                </div>
            </div>
            
            <div className={styles.bottom_widget_container}>
                <div className={styles.bank_widget}>

                </div>
                <div className={styles.todo_widget}>
                    <TodoWidget />
                </div>
            </div>
        </div>
    );
}
