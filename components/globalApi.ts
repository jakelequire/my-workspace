import { Todo } from "@/types/client/todoApp";
import { JobsApp } from "@/types/client/jobApp";
import localForage from '@/localForageConfig';



interface ResponseObj {
    status: number;
    message: string;
    value: string;
}

export default class GlobalApi {
    constructor() {}

    /* --------------------------------------------------------- */
    /* ################## Helper Functions ##################### */
    /* --------------------------------------------------------- */
    public dataCheck(dataOne: any, dataTwo: any): boolean {
        if (dataOne === dataTwo) {
            return true;
        } else {
            return false;
        }
    }

    /* --------------------------------------------------------- */
    /* ################### Local Storage ####################### */
    /* --------------------------------------------------------- */
    public async getLocalData(key: string) {
        const data = await localForage.getItem(key);
        return data;
    }

    public async setLocalData(key: string, data: any) {
        await localForage.setItem(key, data);
    }

    /* --------------------------------------------------------- */
    /* ################ User Authentication #################### */
    /* --------------------------------------------------------- */
    public async getUser(): Promise<any | Error> {
        const response = await fetch('/api/auth/user');
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        return userData;
    }

    public async postUser(userId: string): Promise<void | Error> {
        const response = await fetch('/api/auth/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userId }),
            credentials: 'include',
        })
        if (!response.ok) {
            throw new Error('Failed to post user data');
        }
    }

    public async isUserSignedIn(): Promise<boolean> {
        const response = await fetch('/api/auth/user');
        if (!response.ok) {
            return false;
        }
        return true;
    }

    public async getCookies(): Promise<ResponseObj | Error> {
        const response = await fetch('/api/auth/cookies');
        if (!response.ok) {
            throw new Error('Failed to fetch cookies');
        }
        const cookies = await response.json();
        return cookies;
    }

    /* --------------------------------------------------------- */
    /* ##################### Firestore ######################### */
    /* --------------------------------------------------------- */
    public async getTodoItems(): Promise<Todo.TodoItem[] | Error> {
        const response = await fetch('/api/firestore/todo');
        if (!response.ok) {
            throw new Error('Failed to fetch todo items');
        };
        const data: Todo.TodoItem[] = await response.json();
        return data;
    }


    public async getJobItems(): Promise<JobsApp.JobItem[] | Error> {
        const response = await fetch('/api/firestore/jobs');
        if (!response.ok) throw new Error('Failed to fetch job items');
        const data: JobsApp.JobItem[]  = await response.json();
        return data;
    }
    /* --------------------------------------------------------- */



}
