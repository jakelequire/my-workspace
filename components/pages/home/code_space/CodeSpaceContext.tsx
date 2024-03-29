import React, { createContext, useContext, useState, useEffect } from 'react';
import { CodespaceApp } from '@/types/types';

const CodeSpaceContext = createContext<CodespaceApp.CodeSpaceContextType | undefined>(undefined);

function useCodeSpaceProvider() {
    const [commitHistory, setCommitHistory] = useState<CodespaceApp.GitHubCommitHistoryResponse>();
    const [recentBuild, setRecentBuild] = useState<CodespaceApp.VercelDeploymentResponse[]>([]);

    const [filteredCommitHistory, setFilteredCommitHistory] = useState<
        CodespaceApp.CommitHistoryData[]
    >([]);


    /* ----------------------------------------------------------- */
    /* ### VERCEL API { /api/services/vercel/listdeployments } ### */
    /* ----------------------------------------------------------- */
    useEffect(() => {
        const fetchRecentBuilds = async () => {
            const response = await fetch('/api/services/vercel/listdeployments');
            const data: CodespaceApp.VercelDeploymentResponse[] = await response.json();

            /*DEBUG*/ console.log('[CodeSpaceContext.tsx] Fetch Recent Builds data: ', data);

            setRecentBuild(data);
        };
        fetchRecentBuilds();
    }, []);


    const filterCommitHistory = (weeks: CodespaceApp.CommitHistory['weeks']) => {
        const filteredData = weeks.flatMap(week =>
            week.contributionDays.map(day => ({
                day: day.date,
                value: day.contributionCount,
            }))
        );
        console.log('[CodeSpaceContext.tsx] filteredData: ', filteredData);
        setFilteredCommitHistory(filteredData);
    };


    /* ------------------------------------------ */
    /* ########## FETCH COMMIT HISTORY ########## */
    /* ------------------------------------------ */
    useEffect(() => {
        const fetchCommits = async () => {
            const response = await fetch('/api/services/github/commits');
            const data: CodespaceApp.GitHubCommitHistoryResponse = await response.json();
            console.log('[CodeSpaceContext.tsx] data: ', data);
            setCommitHistory(data);
            const commitHistory = data.data.user.contributionsCollection.contributionCalendar.weeks;
            filterCommitHistory(commitHistory);
        };
        fetchCommits();
    }, []);

    return {
        commitHistory,
        setCommitHistory,
        filteredCommitHistory,
        recentBuild,
        setRecentBuild,
    };
}

export const CodeSpaceProvider = ({ children }: { children: React.ReactNode }) => {
    const value = useCodeSpaceProvider();
    return <CodeSpaceContext.Provider value={value}>{children}</CodeSpaceContext.Provider>;
};

export const useCodeSpaceContext = () => {
    const context = useContext(CodeSpaceContext);
    if (context === undefined) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};