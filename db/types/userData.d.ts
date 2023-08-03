

export namespace UserData {
	export type User = string;
	declare function uid(): User;

	export interface List {
		id: string;
		title: string;
		items: Item[];
	}

	export interface NewList {
		title: string;
		items: never[];
	}

	export interface Item {
		id: string;
		title: string;
		completed: boolean;
		dueDate: string;
		description: string;
		priority: number;
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
