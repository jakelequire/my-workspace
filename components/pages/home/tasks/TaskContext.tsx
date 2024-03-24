import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGlobalContext } from '@/components/GlobalContext';
import { Todo } from '@/types/types';
import localForage from '@/localForageConfig';
import { format } from 'date-fns';

const TaskContext = createContext<Todo.TaskContextType | undefined>(undefined);

function useTaskProvider() {
    const currentDate = format(new Date(), 'PP');

    const [archivedItems, setArchivedItems] = useState<Todo.TodoItem[]>([]);
    const [todoItems, setTodoItems] = useState<Todo.TodoItem[]>([]);
    const [newTodoItem, setNewTodoItem] = useState<Todo.TodoItem>({
        id: '',
        title: '',
        priority: 'Low',
        category: 'Personal',
        description: '',
        completed: false,
        status: 'not started',
        started: currentDate,
        due: '',
    });
    const [editedItem, setEditedItem] = useState<Todo.TodoItem>({
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
    const { todoList, increaseSubmissionCount } = useGlobalContext();

    useEffect(() => {
        setTodoItems(todoList);
    }, [todoList]);

    /* ------------------------------- */
    /* ######## Add Todo Item ######## */
    /* ------------------------------- */
    const addTodoItem = async (newItem: Todo.DbTodoItem) => {
        try {
            const response = await fetch('/api/firestore/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });
            if (!response.ok) throw new Error('Failed to save the todo item');

            const addedItem = await response.json();

            setTodoItems((prevItems) => [...prevItems, addedItem]);

            const currentItems = (await localForage.getItem<Todo.TodoItem[]>('todoItems')) || [];
            await localForage.setItem('todoItems', [...currentItems, addedItem]);

            increaseSubmissionCount();
        } catch (error) {
            console.error('Error adding todo item:', error);
        }
    };

    /* ------------------------------- */
    /* ####### Edit Todo Item ######## */
    /* ------------------------------- */
    const editTodoItem = async (
        id: string,
        updatedItem: Todo.TodoItem
    ): Promise<Omit<Todo.TodoItem, 'id'> | undefined> => {
        const editedItem = { ...updatedItem };
        try {
            const response = await fetch('/api/firestore/todo', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, editedItem }),
            });
            if (!response.ok) throw new Error('Failed to update the todo item');

            setTodoItems((prevItems) =>
                prevItems.map((item) => (item.id === id ? updatedItem : item))
            );
            increaseSubmissionCount();

            const currentItems = (await localForage.getItem<Todo.TodoItem[]>('todoItems')) || [];
            await localForage.setItem(
                'todoItems',
                currentItems.map((item) => (item.id === id ? updatedItem : item))
            );

            return editedItem;
        } catch (error) {
            console.error('Error updating todo item:', error);
        }
    };

    /* -------------------------------- */
    /* ###### Archive Todo Item ####### */
    /* -------------------------------- */
    const archiveTodoItem = async (id: string) => {
        try {
            // Attempt to archive the todo item via an API call
            const response = await fetch('/api/firestore/todo', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) throw new Error('Failed to archive the todo item');
    
            // Filter out the archived item from the current todo items list
            setTodoItems(prevItems => prevItems.filter(item => item.id !== id));
            increaseSubmissionCount(); // Assuming this function updates some state or UI
    
            // Retrieve current items from local storage
            const currentItems = await localForage.getItem<Todo.TodoItem[]>('todoItems') || [];
            const archivedItem = currentItems.find(item => item.id === id);
    
            if (archivedItem) {
                // Update the archived items list and local storage
                setArchivedItems(prevItems => [...prevItems, archivedItem]);
                await localForage.setItem('archivedItems', [archivedItem]);
                await localForage.setItem('todoItems', currentItems.filter(item => item.id !== id));
            }
        } catch (error) {
            console.error(`Error archiving todo item: ${error}`);
            // Handle the error appropriately (e.g., show a user-friendly message)
        }
    }


    /* ------------------------------- */
    /* ###### Delete Todo Item ####### */
    /* ------------------------------- */
    const deleteTodoItem = async (id: string) => {
        try {
            const response = await fetch('/api/firestore/todo', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) throw new Error('Failed to delete the todo item');
            setTodoItems((prevItems) => prevItems.filter((item) => item.id !== id));
            increaseSubmissionCount();
            const currentItems = (await localForage.getItem<Todo.TodoItem[]>('todoItems')) || [];
            // remove the item from localForage
            await localForage.setItem(
                'todoItems',
                currentItems.filter((item) => item.id !== id)
            );
        } catch (error) {
            console.error('Error deleting todo item:', error);
        }
    };

    /* ------------------------------ */
    /* ###### Clear Todo Fields ##### */
    /* ------------------------------ */
    const clearFields = () => {
        setNewTodoItem({
            id: '',
            title: '',
            priority: 'Low',
            category: 'Personal',
            description: '',
            completed: false,
            status: 'not started',
            started: currentDate,
            due: '',
        });
        setEditedItem({
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
        editedItem,
        setEditedItem,
        archiveTodoItem,
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
