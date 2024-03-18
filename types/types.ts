import type { User } from "firebase/auth";

export namespace GlobalState {
    interface LocalUser {
        id: string;
    }

    export interface GlobalContextType {
        user: LocalUser;
        setUser: (user: LocalUser) => void;
        todoList: Todo.TodoItem[];
        setTodoList: (todoList: Todo.TodoItem[]) => void;
        jobList: JT.JobItem[];
        setJobList: (jobList: JT.JobItem[]) => void;
        submissionCount: number;
        setSubmissionCount: (count: number) => void;
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
        setTodoItem: (todoItem: TodoItem) => void;
        addTodoItem: (newItem: TodoItem) => void;

        clearFields: () => void;
        deleteTodoItem: (id: string) => void;
        editTodoItem: (id: string, updatedItem: TodoItem) => Omit<TodoItem, 'id'> | undefined;
    }

    export type DbTodoItem = Omit<TodoItem, 'id'>;
    
    export type AddTodoServerResponse = Promise<TodoItem>
}



export namespace JT {
    export type Status = 'Applied' | 'Saved' | 'Pending Interview' | 'Interviewed' | 'Waiting for Response' | 'Archived';
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
        jobItem: JobItem[];
        setJobItem: (jobItems: JobItem[]) => void;
        newJobItem: JobItem;
        setNewJobItem: (jobItem: JobItem) => void;

        addJobItem: (newJobItem: JobItem) => void;
        clearFields: () => void;
        deleteJobItem: (id: string) => void;
        editJobItem: (id: string, updatedItem: JobItem) => Omit<JobItem, 'id'> | undefined;
        archiveJobItem: (id: string, updatedItem: JobItem) => Omit<JobItem, 'id'> | undefined;
    }

    export type DbJobItem = Omit<JobItem, 'id'>;
    export type AddJobServerResponse = Promise<JobItem>
}