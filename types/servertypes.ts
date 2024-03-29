



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

    export type ClientResponse = DeploymentResponse[];

}



export namespace VercelApi {
    /* --------------------------------------- */
    /* ###### Vercel API Response Types ###### */
    /* --------------------------------------- */
    export interface VercelApiDeploymentResponse {
        deployments: {
            uid: string;
            name: string;
            url: string;
            created: number;
            source: string;
            state: string;
            readyState: string;
            readySubstate: string;
            type: string;
            creator: {};
            inspectorUrl: string;
            meta: {
                githubCommitAuthorName: string;
                githubCommitMessage: string;
                githubCommitOrg: string;
                githubCommitRef: string;
                githubCommitRepo: string;
                githubCommitSha: string;
                githubDeployment: string;
                githubOrg: string;
                githubRepo: string;
                githubRepoOwnerType: string;
                githubCommitRepoId: string;
                githubRepoId: string;
                githubRepoVisibility: string;
                githubCommitAuthorLogin: string;
                branchAlias: string;
            };
            target: string;
            aliasError: null;
            aliasAssigned: number;
            isRollbackCandidate: boolean;
            createdAt: number;
            buildingAt: number;
            ready: number;
            projectSettings: {};
        }[];
    }
    
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
    
}