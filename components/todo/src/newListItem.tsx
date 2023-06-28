'use client';
import {useState, useEffect} from 'react';
import style from '../styles/newListItem.module.css';

interface ListItemProps {
	title: string;
	description: string;
	createdDate: string;
	dueDate: string;
	priority: number;
	completed: boolean;
}

export default function NewListItem(): JSX.Element {
	const [listItem, setListItem] = useState<ListItemProps>({
		title: '',
		description: '',
		createdDate: '',
		dueDate: '',
		priority: 0,
		completed: false,
	});

	return (
		<div className={style.newListItem}>
			<form className={style.form}>
				<div className={style.input_container}>
					<input type='text' className={style.title_input} placeholder='Title' tabIndex={1} />
					<div className={style.image_container}>
						<a className={style.image_button} data-type='submit' tabIndex={7}></a>
					</div>
				</div>

				<div className={style.bottom_container}>
					<div className={style.description_container}>
						<div className={style.description}>
							<textarea
								className={style.description_input}
								placeholder='Description'
								tabIndex={2}></textarea>
						</div>
					</div>

					<div className={style.options_container}>
						<div className={style.dueDate}>
							<p className={style.dueDate_label}>Due Date</p>
							<input type='date' className={style.dueDate_input} tabIndex={3} />
						</div>
						<div className={style.priority_container}>

							<a 
								className={style.priority_button} 
								data-type='low' is-active='false' 
								tabIndex={4}>
							</a>
							
							<a
								className={style.priority_button}
								data-type='medium'
								is-active='false'
								tabIndex={5}>
							</a>

							<a 
								className={style.priority_button} 
								data-type='high' 
								is-active='false' 
								tabIndex={6}>
							</a>

						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
