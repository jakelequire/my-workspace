




export class VercelService {
    API_TOKEN = process.env.NEXT_PUBLIC_VERCEL_API_TOKEN;
    PROJECT_ID: string;

    constructor(projectId: string) {
        this.PROJECT_ID = projectId;
    }


    /**
     * @see https://vercel.com/docs/rest-api/endpoints/deployments#list-deployments-response
     */
    public async listDeployments() {
        const response = await fetch("https://api.vercel.com/v6/deployments", {
            method: "get",
            headers: {
                Authorization: "Bearer " + this.API_TOKEN,
            },
        })
        if(!response.ok) { throw new Error("Error in fetching data.") }
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