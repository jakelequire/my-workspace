


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

    export interface TaskContextType {
        todoItem: TodoItem;
        setTodoItem: (todoItem: TodoItem) => void;
        todoItems: TodoItem[];
        addTodoItem: (newItem: TodoItem) => void;
        clearFields: () => void;
        deleteTodoItem: (id: string) => void;
        editTodoItem: (id: string, updatedItem: TodoItem) => Omit<TodoItem, 'id'> | undefined;
    }

    export type DbTodoItem = Omit<TodoItem, 'id'>;
    
    export type AddTodoServerResponse = Promise<TodoItem>

}
