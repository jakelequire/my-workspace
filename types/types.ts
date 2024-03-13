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
