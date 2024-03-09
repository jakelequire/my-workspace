


export namespace Todo {
    export type Priority = 'Low' | 'Medium' | 'High';
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

    export interface TodoContext {
        id: string;
        title: string;
        priority: Priority;
        category: Category;
        description: string;
        completed: boolean;
        status: Status;
        started: string;
        due: string;
        todoItems: TodoItem[];
        setId: (id: string) => void;
        setTitle: (title: string) => void;
        setPriority: (priority: Priority) => void;
        setCategory: (category: Category) => void;
        setDescription: (description: string) => void;
        setCompleted: (completed: boolean) => void;
        setStatus: (status: Status) => void;
        setStarted: (started: string) => void;
        setDue: (due: string) => void;
        setTodoItems: (todoItems: TodoItem[]) => void;
        clearFields: () => void;
        addTodoItem: (newItem: TodoItem) => void;
    }

    export type DbTodoItem = Omit<TodoItem, 'id'>;
    
    export type AddTodoServerResponse = Promise<TodoItem>

}
