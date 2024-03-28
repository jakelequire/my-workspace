



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