// TaskContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Todo } from "@/types/types";

export const TaskContext = createContext<Todo.TodoContext>({
    id: "",
    title: "",
    priority: 'Low',
    category: 'Personal',
    description: "",
    completed: false,
    status: 'not started',
    started: "",
    due: "",
    todoItems: [] as Todo.TodoItem[],
    setId: (id) => {},
    setTitle: (title) => {},
    setPriority: (priority) => {},
    setCategory: (category) => {},
    setDescription: (description) => {},
    setCompleted: (completed) => {},
    setStatus: (status) => {},
    setStarted: (started) => {},
    setDue: (due) => {},
    setTodoItems: (todoItems: Todo.TodoItem[]) => {},
    clearFields: () => {},
    addTodoItem: (newItem: Todo.TodoItem) => {},
});

export const useTaskContext = () => {
    return useContext(TaskContext);
};

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [id, setId] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [priority, setPriority] = useState<Todo.Priority>('Low');
    const [category, setCategory] = useState<Todo.Category>('Personal');
    const [description, setDescription] = useState<string>("");
    const [completed, setCompleted] = useState<boolean>(false);
    const [status, setStatus] = useState<Todo.Status>('not started');
    const [started, setStarted] = useState<string>("");
    const [due, setDue] = useState<string>("");
    const [todoItems, setTodoItems] = useState<Todo.TodoItem[]>([]);

    const clearFields = () => {
        setId("");
        setTitle("");
        setPriority('Low');
        setCategory('Personal');
        setDescription("");
        setCompleted(false);
        setStatus('not started');
        setStarted("");
        setDue("");
    }

    const addTodoItem = async(newItem: Todo.TodoItem) => {
        // Add the new item to the front end list of todo items
        setTodoItems((prevItems) => [...prevItems, newItem]);
    }

    useEffect(() => {
        const fetchTodoItems = async () => {
            try {
                const response = await fetch('/api/firestore');
                if (!response.ok) throw new Error('Failed to fetch todo items');
                const data = await response.json();
                setTodoItems(data);
            } catch (error) {
                console.error("Error fetching todo items:", error);
            }
        };
        fetchTodoItems();
    }, []);


    return (
        <TaskContext.Provider value={{
            id,
            title,
            priority,
            category,
            description,
            completed,
            status,
            started,
            due,
            todoItems,
            setId,
            setTitle,
            setPriority,
            setCategory,
            setDescription,
            setCompleted,
            setStatus,
            setStarted,
            setDue,
            setTodoItems,
            clearFields,
            addTodoItem,
        }}>
            {children}
        </TaskContext.Provider>
    );
};
