import { Todo } from '@/types/client/todoApp';
import { JobsApp } from '@/types/client/jobApp';
import { CodespaceApp } from '@/types/client/codespaceApp';
import localForage from '@/localForageConfig';

interface ResponseObj {
    status: number;
    message: string;
    value: string;
}

type GetCommitReturn = {
    commitData: CodespaceApp.CommitHistoryData[];
    commitHistory: CodespaceApp.CommitHistory[];
};

type AllDataEnpointReturn = {
    todoItems: Todo.TodoItem[] | Error;
    jobItems: JobsApp.JobItem[] | Error;
    commits: GetCommitReturn | Error;
};

const cache = new Map<string, any>();

export default class GlobalApi {
    constructor() {}

    /* --------------------------------------------------------- */
    /* ################## Helper Functions ##################### */
    /* --------------------------------------------------------- */
    public dataMatch(dataOne: any, dataTwo: any): boolean {
        if (dataOne === dataTwo) {
            return true;
        } else {
            return false;
        }
    }

    public async compareDbToLocalStorage(): Promise<boolean> {
        const localTodoItems = await localForage.getItem('todoItems');
        const mostRecentTodoItems = cache.get('todoItems');

        const localJobItems = await localForage.getItem('jobItems');
        const mostRecentJobItems = cache.get('jobItems');

        if (
            this.dataMatch(localTodoItems, mostRecentTodoItems) &&
            this.dataMatch(localJobItems, mostRecentJobItems)
        ) {
            cache.clear();
            return true;
        }

        return false;
    }

    public async fetchAllData(): Promise<AllDataEnpointReturn | Error> {
        const todoItems= await this.getTodoItems();
        const jobItems = await this.getJobItems();
        const commits = await this.getCommits();

        return { todoItems, jobItems, commits };
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
        });
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
        }
        const data: Todo.TodoItem[] = await response.json();
        cache.set('todoItems', data);

        return data;
    }

    public async getJobItems(): Promise<JobsApp.JobItem[] | Error> {
        const response = await fetch('/api/firestore/jobs');
        if (!response.ok) throw new Error('Failed to fetch job items');
        const data: JobsApp.JobItem[] = await response.json();
        cache.set('jobItems', data);

        return data;
    }

    public async getCommits(): Promise<GetCommitReturn | Error> {
        const response = await fetch('/api/services/github/commits');
        const data: CodespaceApp.GitHubCommitHistoryResponse = await response.json();
        const _commitHistory = data.data.user.contributionsCollection.contributionCalendar.weeks;

        const commitHistory = [data.data.user.contributionsCollection.contributionCalendar];

        const commitData = _commitHistory.flatMap((commitHistory) =>
            commitHistory.contributionDays.map((day) => ({
                day: day.date,
                value: day.contributionCount,
            }))
        );

        return { commitData, commitHistory };
    }
    /* --------------------------------------------------------- */
}
