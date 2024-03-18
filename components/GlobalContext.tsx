'use client';
// GlobalContext.tsx
import React, { useEffect, createContext } from 'react';
import { getAuth } from 'firebase/auth';
import { firebase_app } from '@/lib/firebase-config';
import { GlobalState } from '@/types/types';

const GlobalContext = createContext<GlobalState.GlobalContextType | undefined>(undefined);

function useGlobalProvider() {
    const [user, setUser] = React.useState<GlobalState.GlobalContextType['user']>({
        id: '',
    });
    const [todoList, setTodoList] = React.useState<GlobalState.GlobalContextType['todoList']>([]);
    const [jobList, setJobList] = React.useState<GlobalState.GlobalContextType['jobList']>([]);

    const [submissionCount, setSubmissionCount] = React.useState(0);
    console.log("[GlobalContext.tsx] Submission Count:", submissionCount);

    const auth = getAuth(firebase_app);
    const userId = auth.currentUser?.uid;

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
    }, [submissionCount]);

    /* ------------------------------ */
    /* Fetch job items from Firestore */
    /* ------------------------------ */
    useEffect(() => {
        const fetchJobItems = async () => {
            try {
                const response = await fetch('/api/firestore/jobs');
                if (!response.ok) throw new Error('Failed to fetch job items');
                const data = await response.json();
                setJobList(data);
            } catch (error) {
                console.error('Error fetching job items:', error);
            }
        };
        fetchJobItems();
    }, [submissionCount]);

    return {
        user,
        setUser,
        todoList,
        setTodoList,
        jobList,
        setJobList,
        submissionCount,
        setSubmissionCount,
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
