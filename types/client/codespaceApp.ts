


export namespace CodespaceApp {
    export interface CodeSpaceContextType {
        commitHistory: CodespaceApp.GitHubCommitHistoryResponse | undefined;
        setCommitHistory: (commitHistory: CodespaceApp.GitHubCommitHistoryResponse) => void;
        filteredCommitHistory: CodespaceApp.CommitHistoryData[];
        recentBuild: CodespaceApp.VercelDeploymentResponse[];
        setRecentBuild: (recentBuild: CodespaceApp.VercelDeploymentResponse[]) => void;
        refreshBuildStatus: () => void;
        contributionCount: CodespaceApp.ContributionCount;
    }

    export type DeploymentStates = "BUILDING" | "ERROR" | "INITIALIZING" | "QUEUED" | "READY" | "CANCELED" | ""

    export interface VercelDeploymentResponse {
        name: string;
        url: string;
        created: string;
        state: DeploymentStates;
        inspectorUrl: string;
        meta : {
            githubCommitMessage: string;
            githubRepo: string;
            githubRepoVisibility: string;
        };
        target: string;
        created_at: string;
        building_at: string;
        ready_at: string;
    }

    export interface DeploymentData {
        url: string;
        id: number;
        node_id: string;
        state: string;
        environment: string;
        created_at: string;
        updated_at: string;
        statuses_url: string;
        target_url: string;
    }

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

    export interface GitHubCommitHistoryResponse {
        data: {
            user: {
                contributionsCollection: {
                    contributionCalendar: {
                        totalContributions: number;
                        weeks: Array<{
                            contributionDays: Array<{
                                color: string;
                                contributionCount: number;
                                date: string;
                                weekday: number;
                            }>;
                            firstDay: string;
                        }>;
                    };
                };
            };
        };
    }

    export interface CommitHistoryData {
        day: string;
        value: number;
    }

    export interface ContributionCount {
        total: number;
        year: {
            '2022': number;
            '2023': number;
            '2024': number;
        };
    }
}
