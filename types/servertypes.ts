



export namespace GitHubApi {
    export interface RepoData {
        id: number;
        node_id: string;
        name: string;
        private: boolean;
        html_url: string;
        events_url: string;
        statuses_url: string;
        commits_url: string;
        deployments_url: string;
        pulls_url: string;
    }

    export interface DeploymentData {
        url: string;
        id: number;
        node_id: string;
        environment: string;
        created_at: string;
        updated_at: string;
        statuses_url: string;
        sha: string;
        ref: string;
    }

    export interface DeploymentResponse {
        id: number;
        node_id: string;
        state: string;
        description: string;
        environment: string | undefined;
        created_at: string;
        updated_at: string;
        target_url: string;
    }

    export type ClientResponse = DeploymentResponse[];

    export interface CommitHistory {
        totalContributions: number;
        weeks: {
            totalContributions: number;
            contributionDays: {
                contributionCount: number;
                date: string;
            }[];
            firstDay: string;
        }[];
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



export namespace VercelApi {
    /* --------------------------------------- */
    /* ######## Client Response Types ######## */
    /* --------------------------------------- */
    export interface DeploymentResponse {
        name: string;
        url: string;
        created: string;
        state: string;
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

    export interface DeploymentError extends DeploymentResponse {
        aliasError: {
            code: string;
            message: string;
        };
        aliasAssigned: number;
        isRollbackCandidate: boolean;
    }

    
}