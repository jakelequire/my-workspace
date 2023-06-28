import NewListItem from './newListItem';
import ToDoList from './todo_list';
import style from '../styles/index.module.css'


export default function ToDo(): JSX.Element {

	return (
		<div className={style._todo}>
			<div className={style.list_container}>
                <a className={style.new_list_button}>New List +</a>
                <ol className={style.list}>
                    <li className={style.list_item}>
                        <a className={style.list_item_link}>List 1</a>
                    </li>
                    <li className={style.list_item}>
                        <a className={style.list_item_link}>List 2</a>
                    </li>
                    <li className={style.list_item}>
                        <a className={style.list_item_link}>List 3</a>
                    </li>
                </ol>
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
