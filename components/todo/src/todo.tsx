import NewTaskItem from './tasks/newTaskItem';
import TaskList from './tasks/taskList';
import style from '../styles/index.module.css'
import List from './list/list';

export default function ToDo(): JSX.Element {

	return (
		<div className={style._todo}>
			<div className={style.list_container}>
				<List />
            </div>

			<div className={style.todo_wrapper}>
				<div className={style.top_container}>
                    <NewTaskItem />
                </div>

				<div className={style.form_container}>
                    <TaskList />
                </div>
			</div>
		</div>
	);
}
