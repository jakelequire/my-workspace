import NewListItem from './newListItem';
import ToDoList from './todo_list';
import style from '../styles/index.module.css'
import List from './list';

export default function ToDo(): JSX.Element {

	return (
		<div className={style._todo}>
			<div className={style.list_container}>
				<List />
            </div>

			<div className={style.todo_wrapper}>
				<div className={style.top_container}>
                    <NewListItem />
                </div>

				<div className={style.form_container}>
                    <ToDoList />
                </div>
			</div>
		</div>
	);
}
