


export namespace UserDataCollection {

    export interface ToDo {
        list: {
            [key: string]: {
                id: string;
                title: string;
                items: {
                    [key: string]: Task;
                }
            }

        }
    }

    export type List = {
        id: string;
        title: string;
        items: Task[];
    }

    export type Task = {
        id: string;
        title: string;
        completed: boolean;
        dueDate: string;
        description: string;
        priority: '' | 'none' | 'low' | 'medium' | 'high';
        creationDate: string;
    }

    export interface NewClientList {
        id: string;
        title: string;
        items: never[];
    }

    export interface NewClientList extends List {


    }

    export interface NewClientTask extends Task {


    }

}

export * from './userDataCollection';