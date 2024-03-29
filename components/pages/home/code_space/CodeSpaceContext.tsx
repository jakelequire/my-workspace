import React, { createContext, useContext, useState, useEffect } from 'react';
import { CodespaceApp } from '@/types/types';

const CodeSpaceContext = createContext<CodespaceApp.CodeSpaceContextType | undefined>(undefined);

function useCodeSpaceProvider() {
    const [deploymentData, setDeploymentData] = useState<CodespaceApp.DeploymentData[]>([]);
    const [commitHistory, setCommitHistory] = useState<CodespaceApp.GitHubCommitHistoryResponse>();
    const [recentBuild, setRecentBuild] = useState<CodespaceApp.VercelDeploymentResponse[]>([]);

    const [filteredCommitHistory, setFilteredCommitHistory] = useState<
        CodespaceApp.CommitHistoryData[]
    >([]);

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

    /* ----------------------------------------- */
    /* ########### VERCEL API { ... } ########## */
    /* ----------------------------------------- */
    useEffect(() => {
        const fetchRecentBuilds = async () => {
            const response = await fetch('/api/services/vercel');
            const data: CodespaceApp.VercelDeploymentResponse[] = await response.json();
            console.log('[CodeSpaceContext.tsx] Fetch Recent Builds data: ', data);
            setRecentBuild(data);
        };
        fetchRecentBuilds();
    }, []);

    /* ------------------------------------------ */
    /* ######## FETCH DEPLOYMENT HISTORY ######## */
    /* ------------------------------------------ */
    useEffect(() => {
        const fetchDeployments = async () => {
            const response = await fetch('/api/services/github/deployments');
            const data = await response.json();
            console.log('[CodeSpaceContext.tsx] Fetch Deployments data: ', data);
            setDeploymentData(data);
        };
        fetchDeployments();
    }, []);

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
        deploymentData,
        setDeploymentData,
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
