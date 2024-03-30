import { VercelApi } from "@/types/servertypes";
import { ExternalApi } from "@/types/apiTypes";
import { format } from "date-fns";

const timestampToDate = (timestamp: number) => {
    return format(new Date(timestamp), "MM/dd/yy hh:mm a");
}

export class VercelService {
    API_TOKEN = process.env.NEXT_PUBLIC_VERCEL_API_TOKEN;
    PROJECT_ID = process.env.NEXT_PUBLIC_VERCEL_PROJECT_ID;

    responseDeploymentObj: VercelApi.DeploymentResponse;
    errorDeploymentObj: VercelApi.DeploymentError;

    constructor() {
        // this.PROJECT_ID = projectId;
        this.responseDeploymentObj = {
            name: "",
            url: "",
            created: "",
            state: "",
            inspectorUrl: "",
            meta: {
                githubCommitMessage: "",
                githubRepo: "",
                githubRepoVisibility: "",
            },
            target: "",
            created_at: "",
            building_at: "",
            ready_at: "",
        };

        this.errorDeploymentObj = {
            name: "",
            url: "",
            created: "",
            state: "",
            inspectorUrl: "",
            aliasError: {
                code: "",
                message: "",
            },
            aliasAssigned: 0,
            isRollbackCandidate: false,
            meta: {
                githubCommitMessage: "",
                githubRepo: "",
                githubRepoVisibility: "",
            },
            target: "",
            created_at: "",
            building_at: "",
            ready_at: "",
        };
    }


    /**
     * @see https://vercel.com/docs/rest-api/endpoints/deployments#list-deployments-response
     */
    public async listDeployments(): Promise<VercelApi.DeploymentResponse[] | VercelApi.DeploymentError> {
        const response = await fetch(`https://api.vercel.com/v6/deployments?projectId=${this.PROJECT_ID}`, {
            method: "get",
            headers: {
                Authorization: "Bearer " + this.API_TOKEN,
            },
        })
        const data: ExternalApi.Vercel.ListDeploymentResponse = await response.json();
        if(!response.ok) { throw new Error("Error in fetching data.") }

        if(data.deployments[0].aliasError) { 
            return this.errorDeploymentObj = {
                name: data.deployments[0].name,
                url: data.deployments[0].url,
                created: timestampToDate(data.deployments[0].created),
                state: data.deployments[0].state,
                inspectorUrl: data.deployments[0].inspectorUrl,
                aliasError: {
                    code: data.deployments[0].aliasError.code || "",
                    message: data.deployments[0].aliasError.message || "",
                },
                aliasAssigned: data.deployments[0].aliasAssigned,
                isRollbackCandidate: data.deployments[0].isRollbackCandidate,
                meta: {
                    githubCommitMessage: data.deployments[0].meta.githubCommitMessage,
                    githubRepo: data.deployments[0].meta.githubRepo,
                    githubRepoVisibility: data.deployments[0].meta.githubRepoVisibility,
                },
                target: data.deployments[0].target,
                created_at: timestampToDate(data.deployments[0].createdAt),
                building_at: timestampToDate(data.deployments[0].buildingAt),
                ready_at: timestampToDate(data.deployments[0].ready),
            }
        }

        const deploymentData = data.deployments.map((deployment) => {
            return {
                name: deployment.name,
                url: deployment.url,
                created: timestampToDate(deployment.created),
                state: deployment.state,
                inspectorUrl: deployment.inspectorUrl,
                meta: {
                    githubCommitMessage: deployment.meta.githubCommitMessage,
                    githubRepo: deployment.meta.githubRepo,
                    githubRepoVisibility: deployment.meta.githubRepoVisibility,
                },
                target: deployment.target,
                created_at: timestampToDate(deployment.createdAt),
                building_at: timestampToDate(deployment.buildingAt),
                ready_at: timestampToDate(deployment.ready),
            }
        })
        this.responseDeploymentObj = deploymentData[0];
        
        return deploymentData;
    }


    /**
     * @see https://vercel.com/docs/rest-api/endpoints/deployments#get-deployment-events
     */
    public async getDeploymentEvents() {
        const response = await fetch(`/v3/deployments/${this.PROJECT_ID}/events`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + this.API_TOKEN,
            }
        })
        if(!response.ok) { throw new Error("Error in fetching data.") }
    }



}
