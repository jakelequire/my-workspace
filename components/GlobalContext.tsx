'use client';
// GlobalContext.tsx
import React, { useEffect, createContext } from 'react';
import { getAuth } from 'firebase/auth';
import { firebase_app } from '@/lib/firebase-config';
import { GlobalState, JobsApp, Todo, CodespaceApp } from '@/types/types';
import { synchronizeDb } from '@/utils/dbSync';
import GlobalApi from './globalApi';
import localForage from '@/localForageConfig';

const globalApi = new GlobalApi();

const GlobalContext = createContext<GlobalState.GlobalContextType | undefined>(undefined);

function useGlobalProvider() {
    const [user, setUser] = React.useState<GlobalState.GlobalContextType['user']>({
        id: '',
    });
    const [todoList, setTodoList] = React.useState<GlobalState.GlobalContextType['todoList']>([]);
    const [jobList, setJobList] = React.useState<GlobalState.GlobalContextType['jobList']>([]);
    const [submissionCount, setSubmissionCount] = React.useState(0);
    const [commitData, setCommitData] = React.useState<CodespaceApp.CommitHistoryData[]>([]);
    const [commitHistory, setCommitHistory] = React.useState<CodespaceApp.CommitHistory[]>([]);

    const auth = getAuth(firebase_app);
    const userId = auth.currentUser?.uid;


    /* --------------------------------------------------------- */
    /* Increase Submission Count                                 */
    /* --------------------------------------------------------- */
    const increaseSubmissionCount = () => {
        setSubmissionCount((count) => count + 1);
    };

    /* --------------------------------------------------------- */
    /* Commit data synchronization                               */
    /* --------------------------------------------------------- */
    // useEffect(() => {
    //     // Set an interval for synchronization
    //     const intervalId = setInterval(() => {
    //         synchronizeDb();
    //     }, 1000 * 60 * 30); // synchronize every 30 minutes
    // 
    //     // Clear the interval when the component unmounts
    //     return () => clearInterval(intervalId);
    // }, []);

    useEffect(() => {
        // Immediately try to sync when coming online
        console.log("[GlobalContext.tsx] Adding event listener for 'online' event");
        console.log('[GlobalContext.tsx] Synchronizing database with Firebase...');
        const handleOnline = () => synchronizeDb();
        window.addEventListener('online', handleOnline);

        return () => window.removeEventListener('online', handleOnline);
    }, []);

    useEffect(() => {
        const fetchDataAndUpdateState = () => {
            // <user data>
            if (!globalApi.isUserSignedIn()) {
                globalApi.getUser().then((data) => {
                    if (data instanceof Error) {
                        console.error('Error fetching user data:', data);
                        return;
                    }
                    const userId = data.userId.value;

                    globalApi.postUser(userId).then((response) => {
                        if (response instanceof Error) {
                            console.error('Error posting user data:', response);
                            return;
                        }
                    });

                    setUser(data);
                });
            }
            // </user data>

            // <todo items>
            globalApi.getTodoItems().then((data) => {
                if (data instanceof Error) {
                    console.error('Error fetching todo items:', data);
                    return;
                }
                globalApi.getLocalData('todoItems').then((localData) => {
                    if (localData instanceof Error) {
                        console.error('Error fetching local todo items:', localData);
                        return;
                    }
                    if (!globalApi.dataCheck(data, localData)) {
                        globalApi.setLocalData('todoItems', data);
                    }
                });

                setTodoList(data);
            });
            // </todo items>

            // <job items>
            globalApi.getJobItems().then((data) => {
                if (data instanceof Error) {
                    console.error('Error fetching job items:', data);
                    return;
                }
                globalApi.getLocalData('jobItems').then((localData) => {
                    if (localData instanceof Error) {
                        console.error('Error fetching local job items:', localData);
                        return;
                    }
                    if (!globalApi.dataCheck(data, localData)) {
                        globalApi.setLocalData('jobItems', data);
                    }
                });
                setJobList(data);
            });
            // </job items>

            // <commits>
            globalApi.getCommits().then((data) => {
                if (data instanceof Error) {
                    console.error('Error fetching commits:', data);
                    return;
                }
                const { commitData, commitHistory } = data;

                setCommitData(commitData);
                setCommitHistory(commitHistory);
            });
            // </commits>
        };

        // Call the function immediately to run on mount.
        fetchDataAndUpdateState();

        // Set the interval to keep running the function.
        // synchronize every 5 minutes
        const intervalId = setInterval(fetchDataAndUpdateState, 10000 * 60 * 5);

        // Clean up the interval on component unmount.
        return () => clearInterval(intervalId);
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
        commitData,
        commitHistory,
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

