




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


    }


}