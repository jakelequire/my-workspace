import React, { createContext, useContext, useState, useEffect } from 'react';
import { GitHubApp } from '@/types/types';

const CodeSpaceContext = createContext<GitHubApp.CodeSpaceContextType | undefined>(undefined);

function useCodeSpaceProvider() {
    const [deploymentData, setDeploymentData] = useState<GitHubApp.DeploymentData[]>([]);
    const [commitHistory, setCommitHistory] = useState<GitHubApp.GitHubCommitHistoryResponse>();
    const [filteredCommitHistory, setFilteredCommitHistory] = useState<
        GitHubApp.CommitHistoryData[]
    >([]);

    /*
    export interface CommitHistory {
        totalContributions: number;
        weeks: {
            contributionDays: {
                contributionCount: number;
                date: string;
            }[];
            firstDay: string;
        }[];
    }

    export interface CommitHistoryData {
        day: string;
        count: number;
    }
*/
    const filterCommitHistory = (weeks: GitHubApp.CommitHistory['weeks']) => {
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
    /* ######## FETCH DEPLOYMENT HISTORY ######## */
    /* ------------------------------------------ */
    useEffect(() => {
        const fetchDeployments = async () => {
            const response = await fetch('/api/services/github/deployments');
            const data = await response.json();
            console.log('[CodeSpaceContext.tsx] data: ', data);
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
            const data: GitHubApp.GitHubCommitHistoryResponse = await response.json();
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
