'use client';
import { useState, useEffect } from 'react';
import ToDoState from '../todoState';
import useSessionState from '@/components/useSessionState';
import Image from 'next/image';
// Utils
import IDGen from '@/utils/idGen';
// Styles
import style from '../../styles/list/newList.module.css';
// SVG
import _EDIT from '@/public/assets/edit.svg';
import _CLOSE from '@/public/assets/close-w.svg';

export default function NewListItem(): JSX.Element {
	const {setNewList, dropdownActive, setDropdownActive} = ToDoState();
	const {uid} = useSessionState();
	const [newListName, setNewListName] = useState<string>('');


	function handleNewListSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (newListName.length > 0) {
			const newList = {
				id: IDGen(),
				title: newListName,
				items: [],
			};

			setNewList(newList);

			setDropdownActive(false);

			// Add the list to Firestore
		}
	}

	return (
		<div className={style.new_list_tab}>
			<form
				className={style.new_list_form}
				onSubmit={(event) => {
					handleNewListSubmit(event);
				}}>
				<input className={style.new_list_input} type='text' placeholder='Task Name' />

				<button className={style.new_list_button} type='submit'>
					+
				</button>
			</form>
		</div>
	);
}

//
// interface elProps {
//     name: string
// }
// function el({name}: elProps) {
//     return (
//         <li className={style.list_item}>
//         <div className={style.list_title}>
//           <a className={style.list_item_edit}>
//             <Image width={20} height={20} src={_EDIT} alt="edit" />
//           </a>
//           <a className={style.list_item_link}> {name} </a>
//         </div>
//         <a className={style.list_item_delete}>
//           <Image width={20} height={20} src={_CLOSE} alt="delete" />
//         </a>
//       </li>
//     )
// }
