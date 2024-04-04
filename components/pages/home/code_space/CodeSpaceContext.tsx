import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGlobalContext } from '@/components/GlobalContext';
import { CodespaceApp } from '@/types/types';

const CodeSpaceContext = createContext<CodespaceApp.CodeSpaceContextType | undefined>(undefined);

function useCodeSpaceProvider() {
    const [commitHistory, setCommitHistory] = useState<CodespaceApp.GitHubCommitHistoryResponse>();
    const [filteredCommitHistory, setFilteredCommitHistory] = useState<CodespaceApp.CommitHistoryData[]>([]);

    const [recentBuild, setRecentBuild] = useState<CodespaceApp.VercelDeploymentResponse[]>([]);
    const [contributionCount, setContributionCount] = useState<CodespaceApp.ContributionCount>({
        total: 0,
        year: {
            '2022': 0,
            '2023': 0,
            '2024': 0,
        },
    });

    const { commitData } = useGlobalContext();

    useEffect(() => {
        setFilteredCommitHistory(commitData);
    },[commitData])


    /* ----------------------------------------------------------- */
    /* ### VERCEL API { /api/services/vercel/listdeployments } ### */
    /* ----------------------------------------------------------- */
    const refreshBuildStatus = async () => {
        const response = await fetch('/api/services/vercel/listdeployments');
        const data: CodespaceApp.VercelDeploymentResponse[] = await response.json();
        setRecentBuild(data);
    }
    useEffect(() => {
        const fetchRecentBuilds = async () => {
            const response = await fetch('/api/services/vercel/listdeployments');
            const data: CodespaceApp.VercelDeploymentResponse[] = await response.json();

            /*DEBUG*/ console.log('[CodeSpaceContext.tsx] Fetch Recent Builds data: ', data);

            setRecentBuild(data);
        };
        fetchRecentBuilds();
    }, []);


    /* ------------------------------------------ */
    /* ########## FETCH COMMIT HISTORY ########## */
    /* ------------------------------------------ */
    const fetchContributionCount = async () => {
        const response = await fetch('/api/services/github/contributions');
        const data: CodespaceApp.ContributionCount = await response.json();
        setContributionCount(data);
    };
    useEffect(() => {
        fetchContributionCount();
    },[])

    return {
        commitHistory,
        setCommitHistory,
        filteredCommitHistory,
        recentBuild,
        setRecentBuild,
        refreshBuildStatus,
        contributionCount,
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
