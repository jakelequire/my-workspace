'use client';
import { TodoWidget } from './widget/todo_widget/todoWidget';
import { DashNav } from './navigation/dashNav';
import MiniTodo from './widget/todo_widget/miniTodo';
import CommitsCalendar from './widget/commits_calendar/commitsCalendar'
import QuickAcess from './widget/quick_access/quickAccess'
import MiniJobs from './widget/jobs_widget/miniJobs';
import CommitsData from './widget/commits_data/commitsData';

import { useGlobalContext } from '@/components/GlobalContext';
import styles from './dashboard.module.css';

export default function Dashboard(): JSX.Element {
    const { submissionCount } = useGlobalContext();

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
                    <QuickAcess />
                </div>
                <div className={styles.mini_widget_two}>
                    {/* <CommitsCalendar /> */}
                </div>
                <div className={styles.mini_widget_three}>
                    <MiniJobs />
                </div>
                <div className={styles.mini_widget_four}>
                    <MiniTodo key={submissionCount} />
                </div>
            </div>
            
            <div className={styles.bottom_widget_container}>
                <div className={styles.large_widget_one}>
                    <CommitsData />
                </div>
                <div className={styles.large_widget_two}>
                    <TodoWidget key={submissionCount} />
                </div>
            </div>
        </div>
    );
}
