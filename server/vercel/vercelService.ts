import { VercelApi } from '@/types/servertypes';
import { ExternalApi } from '@/types/apiTypes';
import { format } from 'date-fns';

const timestampToDate = (timestamp: number) => {
    return format(new Date(timestamp), 'MM/dd/yy hh:mm a');
};


const nullDeploymentData: VercelApi.DeploymentResponse = {
    name: 'NO DATA FOUND',
    url: 'NO DATA FOUND',
    created: 'NO DATA FOUND',
    state: 'NO DATA FOUND',
    inspectorUrl: 'NO DATA FOUND',
    meta : {
        githubCommitMessage: 'NO DATA FOUND',
        githubRepo: 'NO DATA FOUND',
        githubRepoVisibility: 'NO DATA FOUND',
    },
    target: 'NO DATA FOUND',
    created_at: 'NO DATA FOUND',
    building_at: 'NO DATA FOUND',
    ready_at: 'NO DATA FOUND',
}

export class VercelService {
    API_TOKEN = process.env.NEXT_PUBLIC_VERCEL_API_TOKEN;
    PROJECT_ID = process.env.NEXT_PUBLIC_VERCEL_PROJECT_ID;

    responseDeploymentObj: VercelApi.DeploymentResponse;
    errorDeploymentObj: VercelApi.DeploymentError;

    constructor() {
        // this.PROJECT_ID = projectId;
        this.responseDeploymentObj = {
            name: '',
            url: '',
            created: '',
            state: '',
            inspectorUrl: '',
            meta: {
                githubCommitMessage: '',
                githubRepo: '',
                githubRepoVisibility: '',
            },
            target: '',
            created_at: '',
            building_at: '',
            ready_at: '',
        };

        this.errorDeploymentObj = {
            name: '',
            url: '',
            created: '',
            state: '',
            inspectorUrl: '',
            aliasError: {
                code: '',
                message: '',
            },
            aliasAssigned: 0,
            isRollbackCandidate: false,
            meta: {
                githubCommitMessage: '',
                githubRepo: '',
                githubRepoVisibility: '',
            },
            target: '',
            created_at: '',
            building_at: '',
            ready_at: '',
        };
    }

    /**
     * @see https://vercel.com/docs/rest-api/endpoints/deployments#list-deployments-response
     */
    public async listDeployments(): Promise<
        VercelApi.DeploymentResponse[] | VercelApi.DeploymentError
    > {
        const response = await fetch(
            `https://api.vercel.com/v6/deployments?projectId=${this.PROJECT_ID}`,
            {
                method: 'get',
                headers: {
                    Authorization: 'Bearer ' + this.API_TOKEN,
                },
            }
        );
        const data: ExternalApi.Vercel.ListDeploymentResponse = await response.json();
        if (!response.ok) {
            return [nullDeploymentData];
        }

        if (data.deployments[0].aliasError) {
            const deployments = data.deployments[0];
            this.errorDeploymentObj = {
                name: deployments.name,
                url: deployments.url,
                created: timestampToDate(deployments.created),
                state: deployments.state,
                inspectorUrl: deployments.inspectorUrl,
                aliasError: {
                    code: deployments.aliasError.code || '',
                    message: deployments.aliasError.message || '',
                },
                aliasAssigned: deployments.aliasAssigned,
                isRollbackCandidate: deployments.isRollbackCandidate,
                meta: {
                    githubCommitMessage: deployments.meta.githubCommitMessage,
                    githubRepo: deployments.meta.githubRepo,
                    githubRepoVisibility: deployments.meta.githubRepoVisibility,
                },
                target: deployments.target,
                created_at: timestampToDate(deployments.createdAt),
                building_at: timestampToDate(deployments.buildingAt),
                ready_at: timestampToDate(deployments.ready),
            };

            return this.errorDeploymentObj;
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
            };
        });
        this.responseDeploymentObj = deploymentData[0];

        return deploymentData;
    }

    /**
     * @see https://vercel.com/docs/rest-api/endpoints/deployments#get-deployment-events
     */
    public async getDeploymentEvents() {
        const response = await fetch(`/v3/deployments/${this.PROJECT_ID}/events`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.API_TOKEN,
            },
        });
        if (!response.ok) {
            throw new Error('Error in fetching data.');
        }
    }

    public async specificDeploymentEvent() {

        const response = await fetch(
            `https://api.vercel.com/v3/deployments/${this.PROJECT_ID}/events?builds=1&delimiter=1&direction=backward&follow=1&limit=100&name=bld_cotnkcr76&since=1540095775941&statusCode=5xx&teamId=SOME_STRING_VALUE&until=1540106318643`,
            {
                headers: {
                    Authorization: 'Bearer <TOKEN>',
                },
                method: 'get',
            }
        );
    }
}
