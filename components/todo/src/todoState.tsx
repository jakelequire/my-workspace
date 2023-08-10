import {useState, useEffect, useMemo} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '@/lib/firebase';
import {UserDataCollection as UDC} from '@/db/types/userData';
import useSessionState from '@/components/useSessionState';
import UserData from '@/db/collections/userData';
// import newList from '../api/newList';
											
export default function ToDoState() {
	const [dropdownActive, setDropdownActive] = useState<boolean>(false);
	const [sessionLists, setSessionLists] = useState(<></>);

	const {uid} = useSessionState();

	const userDataCollection = useMemo(() => {
		if (uid === '') return;
		const userDataCollection = new UserData(uid);
		return userDataCollection;
	}, [uid]);

	const [todoLists, setTodoLists] = useState<UDC.List>({
		id: '',
		title: '',
		items: [
			{
				id: '',
				title: '',
				description: '',
				creationDate: '',
				dueDate: '',
				priority: 'none',
				completed: false,
			},
		],
	});

	const [newList, setNewList] = useState<UDC.List>({
		id: '',
		title: '',
		items: [],
	});

	const [newClientTask, setNewClientTask] = useState<UDC.Task>({
		id: '',
		title: '',
		description: '',
		creationDate: '',
		dueDate: '',
		priority: 'none',
		completed: false,
	});

	// !useEffect to create a new list with an empty item array in Firebase
	useEffect(() => {
		if (userDataCollection === undefined) return;
		userDataCollection.createList(newList);
	}, [newList, userDataCollection]);

	// !useEffect to create a new item in Firebase
	useEffect(() => {
		if (userDataCollection === undefined) return;
		userDataCollection.createTask(newClientTask.title, newClientTask);
	}, [newClientTask, userDataCollection]);

	// !Debugging
	// Not able to get the user data from the database
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {});
		return () => unsubscribe();
	}, []);

	return {
		todoLists,
		setTodoLists,
		newList,
		setNewList,
		dropdownActive,
		setDropdownActive,
		sessionLists,
		setSessionLists,
		newClientTask,
		setNewClientTask,
	};
}
