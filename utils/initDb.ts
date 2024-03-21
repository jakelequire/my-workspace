
import { Todo, JobsApp } from '@/types/types';
import localForage from '@/localForageConfig';



export class InitDb {
    constructor() {};


    public async initDb() {
        try {
            const todoItems = await this.fetchTodoItems();
            const jobItems = await this.fetchJobItems();

            // Save to localForage to start the cache
            localForage.setItem('todoItems', todoItems);
            localForage.setItem('jobItems', jobItems);

            return { todoItems, jobItems };
        } catch (error) {
            console.error('\n[intiDb] Error fetching todo and job items:', error);
        }
    }

    
    private async fetchTodoItems(): Promise<Todo.TodoItem[]> {
        const response = await fetch("/api/firestore/todo", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        if (!response.ok) throw new Error('\n[intiDb] Failed to fetch todo items\n');

        const data = await response.json();
        return data;
    }


    private async fetchJobItems(): Promise<JobsApp.JobItem[]> {
        const response = await fetch("/api/firestore/jobs", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        if (!response.ok) throw new Error('\n[intiDb] Failed to fetch job items\n');

        const data = await response.json();
        return data;
    }
}
