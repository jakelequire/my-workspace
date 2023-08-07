import { DocumentData } from "firebase/firestore";

export namespace UserData {
	export type User = string;
	declare function uid(): User;

	export interface List {
		id: string;
		title: string;
		items: Item[{}];
	}

	export interface NewList {
		id: string;
		title: string;
	}

	export interface Item {
		id: string;
		title: string;
		completed: boolean;
		dueDate: string;
		description: string;
		priority: '' | 'none' | 'low' | 'medium' | 'high';
		creationDate: string;
	}

	export interface ToDo {
		list: {
			[key: string]: {
				title: string;
				items: {
					[key: string]: Item;
				};
			};
		};
	}


}
