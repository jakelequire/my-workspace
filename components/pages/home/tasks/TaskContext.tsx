import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGlobalContext } from '@/components/GlobalContext';
import { Todo } from '@/types/types';

const TaskContext = createContext<Todo.TaskContextType | undefined>(undefined);

function useTaskProvider() {
    const [todoItems, setTodoItems] = useState<Todo.TodoItem[]>([]);
    const [newTodoItem, setNewTodoItem] = useState<Todo.TodoItem>({
        id: '',
        title: '',
        priority: 'Low',
        category: 'Personal',
        description: '',
        completed: false,
        status: 'not started',
        started: '',
        due: '',
    });
    const [submissionCount, setSubmissionCount] = useState(0);


    const { todoList } = useGlobalContext();

    useEffect(() => {
        setTodoItems(todoList);
    }, [todoList]);

    const addTodoItem = (newItem: Todo.TodoItem) => {
        setTodoItems((prevItems) => [...prevItems, newItem]);
    };

    const editTodoItem = (
        id: string,
        updatedItem: Todo.TodoItem
    ): Omit<Todo.TodoItem, 'id'> | undefined => {
        setTodoItems((prevItems) => prevItems.map((item) => (item.id === id ? updatedItem : item)));
        const { id: _, ...todoItem } = updatedItem;
        if (!todoItem) return;
        return todoItem;
    };

    const deleteTodoItem = (id: string) => {
        setTodoItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const clearFields = () => {
        setNewTodoItem({
            id: '',
            title: '',
            priority: 'Low',
            category: 'Personal',
            description: '',
            completed: false,
            status: 'not started',
            started: '',
            due: '',
        });
    };

    return {
        todoItem: newTodoItem,
        todoItems,
        submissionCount,
        addTodoItem,
        setTodoItem: setNewTodoItem,
        clearFields,
        deleteTodoItem,
        editTodoItem,
        setSubmissionCount,
    };
}

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const value = useTaskProvider();
    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};
