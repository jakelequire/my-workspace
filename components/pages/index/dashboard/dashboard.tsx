'use client';
import { TodoWidget } from './widget/todoWidget';
import styles from './dashboard.module.css';

export default function Dashboard(): JSX.Element {

    return (
        <div className={styles.dashboard_container}>
            
            <div className={styles.bottom_widget_container}>
                <div className={styles.bank_widget}>
        
                </div>
                <div className={styles.todo_widget}>
                
                </div>
            </div>
        </div>
    );
}
