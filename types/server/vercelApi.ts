


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