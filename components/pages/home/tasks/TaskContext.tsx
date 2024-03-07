// TaskContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

type TodoItem = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    status: 'not started' | 'in-progress' | 'completed';
    started: string;
    due: string;
};

export const TaskContext = createContext({
    task: "",
    setTask: (task: string) => {},
});

export const useTaskContext = () => {
    return useContext(TaskContext);
};

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [task, setTask] = useState("");

    return (
        <TaskContext.Provider value={{ task, setTask }}>
            {children}
        </TaskContext.Provider>
    );
};