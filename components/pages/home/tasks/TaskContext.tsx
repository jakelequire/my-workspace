import React, { createContext, useContext, useState, useEffect } from 'react';
import { Todo } from '@/types/types';

const TaskContext = createContext<Todo.TaskContextType | undefined>(undefined);

// Custom hook to manage and encapsulate the state logic
function useTaskProvider() {
    const [todoItems, setTodoItems] = useState<Todo.TodoItem[]>([]);
    const [todoItem, setTodoItem] = useState<Todo.TodoItem>({
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

    useEffect(() => {
        const fetchTodoItems = async () => {
            try {
                const response = await fetch('/api/firestore');
                if (!response.ok) throw new Error('Failed to fetch todo items');
                const data = await response.json();
                setTodoItems(data);
            } catch (error) {
                console.error('Error fetching todo items:', error);
            }
        };
        fetchTodoItems();
    }, []);

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
        setTodoItem({
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
        todoItem,
        todoItems,
        addTodoItem,
        setTodoItem,
        clearFields,
        deleteTodoItem,
        editTodoItem,
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
