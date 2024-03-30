




export namespace ExternalApi {

    export namespace Vercel {
        /**
         * @see https://vercel.com/docs/rest-api/endpoints/deployments#list-deployments-response
         * @route https://api.vercel.com/v6/deployments
         * @example
         * ```ts
         * await fetch("https://api.vercel.com/v6/deployments?projectId={PROJECT_ID}", {
         *      headers: {
         *        "Authorization": "Bearer <TOKEN>"
         *      },
         *      method: "get"
         *      })
         * ```
        */
        export interface ListDeploymentResponse {
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
    }




    export namespace GitHub {
        /**
         * @untested
         */
        export interface ListCommits {
            url: string;
            sha: string;
            node_id: string;
            html_url: string;
            comments_url: string;
            commit: {
                url: string;
                author: {
                    name: string;
                    email: string;
                    date: string;
                };
                committer: {
                    name: string;
                    email: string;
                    date: string;
                };
                message: string;
                tree: {
                    url: string;
                    sha: string;
                };
                comment_count: number;
                verification: {
                    verified: boolean;
                    reason: string;
                    signature: any;
                    payload: any
                }
            };
            author: {
                login: string;
                id: number;
                node_id: string;
                avatar_url: string;
                gravatar_id: string;
                url: string;
                html_url: string;
                followers_url: string;
                following_url: string;
                gists_url: string;
                starred_url: string;
                subscriptions_url: string;
                organizations_url: string;
                repos_url: string;
                events_url: string;
                received_events_url: string;
                type: string;
                site_admin: boolean;
            };
            committer: {
                login: string;
                id: number;
                node_id: string;
                avatar_url: string;
                gravatar_id: string;
                url: string;
                html_url: string;
                followers_url: string;
                following_url: string;
                gists_url: string;
                starred_url: string;
                subscriptions_url: string;
                organizations_url: string;
                repos_url: string;
                events_url: string;
                received_events_url: string;
                type: string;
                site_admin: boolean;
            };
            parents: Array<{
                url: string;
                sha: string;
            }>
        }

    }


}