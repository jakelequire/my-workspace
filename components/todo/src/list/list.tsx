'use client';
import {useState, useEffect} from 'react';
import NewListItem from './newListItem';
import ToDoState from '../todoState';
// Styles
import style from '../../styles/list/list.module.css';
// SVG
import _EDIT from '@/public/assets/edit.svg';
import _CLOSE from '@/public/assets/close-w.svg';

export default function List(): JSX.Element {
  const {sessionLists, sessionTasks, dropdownActive, setDropdownActive} = ToDoState();
	const [newList, setNewList] = useState<JSX.Element>();

	const handleClick = () => {
		setDropdownActive(!dropdownActive);
	};

	useEffect(() => {
		if (dropdownActive) {
			setNewList(<NewListItem />);
		} else {
			setNewList(undefined);
		}
	}, [dropdownActive, setNewList]);

  useEffect(() => {
    console.log(sessionLists);
  }, [sessionLists])

  const plusOrMinus = dropdownActive ? '-' : '+';

	return (
		<div className={style.list_container}>
			<a
				className={style.new_list_button}
				onClick={() => {
					handleClick();
				}}>
				<span className={style.newListText}>New List {plusOrMinus}</span>
			</a>
			{newList}
			<ol className={style.list}>
        {...sessionLists}
			</ol>
		</div>
	);
}
