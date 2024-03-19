'use client';
// GlobalContext.tsx
import React, { useEffect, createContext } from 'react';
import { getAuth } from 'firebase/auth';
import { firebase_app } from '@/lib/firebase-config';
import { GlobalState, JT, Todo } from '@/types/types';
import localForage from '@/localForageConfig';

const GlobalContext = createContext<GlobalState.GlobalContextType | undefined>(undefined);

function useGlobalProvider() {
    const [user, setUser] = React.useState<GlobalState.GlobalContextType['user']>({
        id: '',
    });
    const [todoList, setTodoList] = React.useState<GlobalState.GlobalContextType['todoList']>([]);
    const [jobList, setJobList] = React.useState<GlobalState.GlobalContextType['jobList']>([]);

    const [submissionCount, setSubmissionCount] = React.useState(0);
    console.log('[GlobalContext.tsx] Submission Count:', submissionCount);

    const auth = getAuth(firebase_app);
    const userId = auth.currentUser?.uid;

    const increaseSubmissionCount = () => {
        setSubmissionCount((count) => count + 1);
    }

    /* ---------------------- */
    /* Fetch user and session */
    /* ---------------------- */
    useEffect(() => {
        const fetchUserAndSession = async () => {
            try {
                // Attempt to fetch user details
                const userResponse = await fetch('/api/auth/user');
                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    console.log('User ID Response:', userData.userId.value);
                    setUser({ id: userData.userId.value });

                    // If user ID is found, attempt to initiate a session
                    if (userData.userId.value) {
                        const sessionResponse = await fetch('/api/auth/user', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ userId: userData.userId.value }),
                            credentials: 'include',
                        });

                        if (sessionResponse.ok) {
                            console.log('Session initiated');
                        } else {
                            console.error('Error initiating session');
                        }
                    }
                } else {
                    console.log('No user ID found');
                    await fetch('/api/auth/user', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId: userId }),
                        credentials: 'include',
                    });
                }
            } catch (error) {
                console.error('Error fetching user or session:', error);
            }
        };

        fetchUserAndSession();
    }, [userId]);

    /* ------------------------------- */
    /* Fetch todo items from Firestore */
    /* ------------------------------- */
    useEffect(() => {
        // Function to load todo items
        const loadTodoItems = async () => {
            try {
                // Attempt to load todo items from localForage
                let todoItems = await localForage.getItem('todoItems');

                // If the cache is empty or null, fetch from Firebase and update the cache
                if (!todoItems) {
                    console.log("[GlobalContext.tsx] Fetching todo items from Firestore")
                    const response = await fetch('/api/firestore/todo');
                    if (!response.ok) throw new Error('Failed to fetch todo items');
                    todoItems = await response.json();
                    
                    // Cache the fetched todo items in localForage
                    await localForage.setItem('todoItems', todoItems);
                }

                console.log("[GlobalContext.tsx] Loaded todo items from local storage:", todoItems);
                // Update local state with either cached or fetched data
                setTodoList(todoItems as Todo.TodoItem[]);
            } catch (error) {
                console.error('Error loading or fetching todo items:', error);
            }
        };

        loadTodoItems();
    }, []);

    /* ------------------------------ */
    /* Fetch job items from Firestore */
    /* ------------------------------ */
    useEffect(() => {
        // Function to load job items
        const loadJobItems = async () => {
            try {
                // Attempt to load job items from localForage
                let jobItems = await localForage.getItem('jobItems');

                // If the cache is empty or null, fetch from Firebase and update the cache
                if (!jobItems) {
                    console.log("[GlobalContext.tsx] Fetching job items from Firestore")
                    const response = await fetch('/api/firestore/jobs');
                    if (!response.ok) throw new Error('Failed to fetch job items');
                    jobItems = await response.json();
                    
                    // Cache the fetched job items in localForage
                    await localForage.setItem('jobItems', jobItems);
                }

                console.log("[GlobalContext.tsx] Loaded job items from local storage:", jobItems);
                // Update local state with either cached or fetched data
                setJobList(jobItems as JT.JobItem[]);
            } catch (error) {
                console.error('Error loading or fetching job items:', error);
            }
        };

        loadJobItems();
    }, []);

    return {
        user,
        setUser,
        todoList,
        setTodoList,
        jobList,
        setJobList,
        submissionCount,
        increaseSubmissionCount,
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
