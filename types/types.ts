import type { User } from "firebase/auth";

export namespace GlobalState {

    export interface GlobalContextType {
        user: User | null;
        setUser: (user: User) => void;
        todoList: Todo.TodoItem[];
        setTodoList: (todoList: Todo.TodoItem[]) => void;
    }

}


export namespace Todo {
    export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
    export type Category = 'Personal' | 'Appointment' | 'Project' | 'Work' | 'Other';
    export type Status = 'not started' | 'in-progress' | 'completed';

    export type TodoItem = {
        id: string;
        title: string;
        priority: Priority;
        category: Category;
        description: string;
        completed: boolean;
        status: Status;
        started: string;
        due: string;
    };

    export interface TaskContextType {
        todoItem: TodoItem;
        todoItems: TodoItem[];
        submissionCount: number;
        setTodoItem: (todoItem: TodoItem) => void;
        addTodoItem: (newItem: TodoItem) => void;
        clearFields: () => void;
        deleteTodoItem: (id: string) => void;
        editTodoItem: (id: string, updatedItem: TodoItem) => Omit<TodoItem, 'id'> | undefined;
        setSubmissionCount: (count: number) => void;
    }

    export type DbTodoItem = Omit<TodoItem, 'id'>;
    
    export type AddTodoServerResponse = Promise<TodoItem>
}



export namespace JT {
    export type Status = 'Applied' | 'Saved' | 'Pending Interview' | 'Interviewed' | 'Waiting for Response';
    export type ApplicationType = 'Job' | 'Internship' | 'Freelance' | 'Contract' | 'Other';
    export type Source = 'Indeed' | 'LinkedIn' | 'Glassdoor' | 'Monster' | 'Company Website' | 'Other';

    export type JobItem = {
        id: string,
        companyName: string,
        position: string,
        payRange: string,
        location: string,
        dateApplied: string,
        source: string,
        status: Status,
        applicationType: ApplicationType,
        jobLink: string,
    }
    
    export interface JobTrackerContext {
        submissionCount: number;
        setSubmissionCount: (count: number) => void;
        jobItem: JobItem[];
        setJobItem: (jobItems: JobItem[]) => void;
        newJobItem: JobItem;
        setNewJobItem: (jobItem: JobItem) => void;
        currentTab: string;
        setCurrentTab: (tab: string) => void;
        
        addJobItem: (newJobItem: JobItem) => void;
        clearFields: () => void;
        deleteJobItem: (id: string) => void;
        editJobItem: (id: string, updatedItem: JobItem) => Omit<JobItem, 'id'> | undefined;
    }

    export type DbJobItem = Omit<JobItem, 'id'>;
    export type AddJobServerResponse = Promise<JobItem>
}