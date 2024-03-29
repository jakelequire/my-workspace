import { VercelApi } from "@/types/servertypes";
import { format } from "date-fns";

const timestampToDate = (timestamp: number) => {
    return format(new Date(timestamp), "MM/dd/yy hh:mm a");
}

export class VercelService {
    API_TOKEN = process.env.NEXT_PUBLIC_VERCEL_API_TOKEN;
    PROJECT_ID = process.env.NEXT_PUBLIC_VERCEL_PROJECT_ID;

    responseDeploymentObj: VercelApi.DeploymentResponse;

    constructor() {
        // this.PROJECT_ID = projectId;
        this.responseDeploymentObj = {
            name: '',
            url: '',
            created: '',
            state: '',
            inspectorUrl: '',
            meta : {
                githubCommitMessage: '',
                githubRepo: '',
                githubRepoVisibility: '',
            },
            target: '',
            created_at: '',
            building_at: '',
            ready_at: '',
        }
    }


    /**
     * @see https://vercel.com/docs/rest-api/endpoints/deployments#list-deployments-response
     */
    public async listDeployments() {
        const response = await fetch(`https://api.vercel.com/v6/deployments?projectId=${this.PROJECT_ID}`, {
            method: "get",
            headers: {
                Authorization: "Bearer " + this.API_TOKEN,
            },
        })
        if(!response.ok) { throw new Error("Error in fetching data.") }

        const data: VercelApi.VercelApiDeploymentResponse = await response.json();
        /*DEBUG*/ console.log("\n[VercelService] listDeployments\n", data, '\n')
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
        
        console.log("\n[VercelService] listDeployments\n", this.responseDeploymentObj, '\n')
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
