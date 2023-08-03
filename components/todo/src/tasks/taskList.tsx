import { UserData } from '@/db/types/userData';
import style from '../../styles/tasks/taskList.module.css';

export default function TaskList(): JSX.Element {
	return (
		<div className={style.todo_container}>
			{exampleListData.map((item, index) => (
				<ListItem
					key={index}
					id={item.id}
					title={item.title}
					description={item.description}
					creationDate={item.createdDate}
					dueDate={item.dueDate}
					priority={item.priority}
					completed={item.completed}
				/>
			))}
		</div>
	);
}

function ListItem({
	title,
	description,
	creationDate,
	dueDate,
	priority,
	completed,
}: UserData.Item): JSX.Element {
	return (
		<div className={style.list_item}>
			<div className={style.list_item_title}>
				<h3 className={style.title}>{title}</h3>
				<p className={style.description}>{description}</p>
				<p className={style.createDate}>{creationDate}</p>
			</div>
			<div className={style.list_item_sidebar}>
				<p className={style.priority}>{priority}</p>
				<p className={style.dueDate}>{dueDate}</p>
			</div>
			<div className={style.list_item_checkbox}>
				<input
					type='checkbox'
					checked={completed}
					className={style.checkbox}
					onChange={() => {
						console.log('Checkbox clicked');
					}}
				/>
			</div>
		</div>
	);
}

const exampleListData = [
	{
		id: '0',
		title: 'Example Title',
		description: 'Example Description',
		createdDate: '2021-10-10',
		dueDate: '2021-10-10',
		priority: 1,
		completed: false,
	},
	{
		id: '1',
		title: 'Example Title',
		description: 'Example Description',
		createdDate: '2021-10-10',
		dueDate: '2021-10-10',
		priority: 1,
		completed: false,
	},
	{
		id: '2',
		title: 'Example Title',
		description: 'Example Description',
		createdDate: '2021-10-10',
		dueDate: '2021-10-10',
		priority: 1,
		completed: false,
	},
];
