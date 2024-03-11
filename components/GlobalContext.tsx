'use client';
// GlobalContext.tsx
import React, { useEffect, createContext } from 'react';
import { GlobalState } from '@/types/types';

const GlobalContext = createContext<GlobalState.GlobalContextType | undefined>(undefined);

function useGlobalProvider() {
    const [user, setUser] = React.useState<GlobalState.GlobalContextType['user']>(null);
    const [todoList, setTodoList] = React.useState<GlobalState.GlobalContextType['todoList']>([]);

    /* ------------------------------- */
    /* Fetch todo items from Firestore */
    /* ------------------------------- */
    useEffect(() => {
        const fetchTodoItems = async () => {
            try {
                const response = await fetch('/api/firestore');
                if (!response.ok) throw new Error('Failed to fetch todo items');
                const data = await response.json();
                setTodoList(data);
            } catch (error) {
                console.error('Error fetching todo items:', error);
            }
        };
        fetchTodoItems();
    }, []);

    return {
        user,
        setUser,
        todoList,
        setTodoList,
    };
}

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const value = useGlobalProvider();
    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
    const context = React.useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};
