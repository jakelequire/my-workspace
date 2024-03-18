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


    const { todoList, submissionCount, setSubmissionCount } = useGlobalContext();

    useEffect(() => {
        setTodoItems(todoList);
    }, [todoList]);

    const addTodoItem = (newItem: Todo.TodoItem) => {
        setTodoItems((prevItems) => [...prevItems, newItem]);
        setSubmissionCount(submissionCount + 1);
    };

    const editTodoItem = (
        id: string,
        updatedItem: Todo.TodoItem
    ): Omit<Todo.TodoItem, 'id'> | undefined => {
        setTodoItems((prevItems) => prevItems.map((item) => (item.id === id ? updatedItem : item)));
        setSubmissionCount(submissionCount + 1);
        const { id: _, ...todoItem } = updatedItem;
        if (!todoItem) return;
        return todoItem;
    };

    const deleteTodoItem = (id: string) => {
        setTodoItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setSubmissionCount(submissionCount + 1);
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
        addTodoItem,
        setTodoItem: setNewTodoItem,
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
