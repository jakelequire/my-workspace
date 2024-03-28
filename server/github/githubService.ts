import { format } from 'date-fns';
import { Octokit } from 'octokit';
import { GitHubApi } from '@/types/servertypes';

const GITHUB_AUTH_TOKEN = process.env.NEXT_PUBLIC_GITHUB_KEY;

const octokit = new Octokit({
    auth: GITHUB_AUTH_TOKEN,
});

const QUERY = `
query($userName:String!) {
  user(login: $userName){
    contributionsCollection(from: "2024-01-01T00:00:00Z") {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            color
            contributionCount
            date
            weekday
          }
          firstDay
        }
      }
    }
  }
}
`;

export class GitHubService {
    octokit = octokit;
    repoitories: GitHubApi.RepoData[];
    deploymentData: GitHubApi.DeploymentData[];
    deploymentResponse: GitHubApi.DeploymentResponse[];
    commitHistory: [];

    constructor() {
        this.octokit = octokit;
        this.repoitories = [];
        this.deploymentData = [];
        this.deploymentResponse = [];
        this.commitHistory = [];
    }

    /* ----------------------------------------- */
    /*  ########## { getDeployments } ########## */
    /* Lists all deployments for a specific repo */
    /* ----------------------------------------- */
    async getDeployments() {
        try {
            const res = await this.octokit.rest.repos.listDeployments({
                owner: 'jakelequire',
                repo: 'my-workspace',
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                },
            });
            this.deploymentData = res.data.map((deployment) => ({
                url: deployment.url,
                id: deployment.id,
                node_id: deployment.node_id,
                environment: deployment.environment,
                created_at: deployment.created_at,
                updated_at: deployment.updated_at,
                statuses_url: deployment.statuses_url,
                sha: deployment.sha,
                ref: deployment.ref,
            }));
        } catch (error) {
            console.error('\nError fetching deployments:\n', error, '\n');
            // Handle error as needed
            throw new Error('\nError fetching deployments\n');
        }
    }

    /* ---------------------------------------------- */
    /* ######### { fetchDeploymentStatuses } ######## */
    /* Retreives the status of a specific deployment, */
    /*  currently set to the most recent deployment   */
    /* ---------------------------------------------- */
    async fetchDeploymentStatuses() {
        await this.getDeployments();

        console.log('[fetchDeploymentStatuses] deploymentData', this.deploymentData[0], '\n');

        const deploymentStatuses = await this.octokit.request(
            'GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses',
            {
                owner: 'jakelequire',
                repo: 'my-workspace',
                deployment_id: this.deploymentData[0].id,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                },
            }
        );

        console.log('[fetchDeploymentStatuses] deploymentStatuses', deploymentStatuses.data[0].target_url, '\n');

        const formatDate = (date: string) => {
            return format(new Date(date), 'MM/dd/yyyy hh:mm a');
        };

        const responseObject = {
            id: deploymentStatuses.data[0].id,
            node_id: deploymentStatuses.data[0].node_id,
            state: deploymentStatuses.data[0].state,
            description: deploymentStatuses.data[0].description,
            environment: deploymentStatuses.data[0].environment || 'No Environment',
            created_at: formatDate(deploymentStatuses.data[0].created_at),
            updated_at: formatDate(deploymentStatuses.data[0].updated_at),
            target_url: deploymentStatuses.data[0].target_url,
        };
        // The array starting at index 0 is the most recent deployment status (should be)
        this.deploymentResponse.push(responseObject);

        return this.deploymentResponse;
    }

    async fullCommitHistory() {
        const res = await this.octokit.rest.repos.listCommits({
            owner: 'jakelequire',
            repo: 'my-workspace',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });
        return res.data;
    }

    async getAllRepos() {
        const res = await this.octokit.rest.repos.listForAuthenticatedUser({
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });
        res.data.forEach((repo) => {
            this.repoitories.push({
                id: repo.id,
                node_id: repo.node_id,
                name: repo.name,
                private: repo.private,
                html_url: repo.html_url,
                events_url: repo.events_url,
                statuses_url: repo.statuses_url,
                commits_url: repo.commits_url,
                deployments_url: repo.deployments_url,
                pulls_url: repo.pulls_url,
            });
        });
        return res.data;
    }

    async viewCommitsData() {
        const TOKEN = GITHUB_AUTH_TOKEN;
        const query = QUERY
        const variables = `
        {
            "userName": "jakelequire"
        }
        `;
        const body = {
            query,
            variables,
        };
        const res = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(body),
        });
        const response = await res.json();
        const commitHistory = (this.commitHistory =
            response.data.user.contributionsCollection.contributionCalendar.totalContributions);
        console.log('\ncommitHistory', commitHistory, '\n');
        return response;
    }

    /* DEBUGGING */
    logDeploymentData() {
        this.fetchDeploymentStatuses();
        console.log('\deploymentResponse', this.deploymentResponse, '\n');
        // console.log('\ndeploymentData', this.deploymentData, '\n');
    }
    /* DEBUGGING */
    logDeploymentResponse() {
        console.log('\ndeploymentResponse', this.deploymentResponse, '\n');
    }
    /* DEBUGGING */
    async logGetAllRepos() {
        await this.getAllRepos();
        console.log('\nrepoitories', this.repoitories, '\n');
    }
    /* DEBUGGING */
    async logCommits() {
        const commits = await this.viewCommitsData();
        console.log('\ncommits', commits, '\n');
    }
    /* DEBUGGING */
    async logFullCommitHistory() {
        const fullCommitHistory = await this.fullCommitHistory();
        console.log('\nfullCommitHistory', fullCommitHistory, '\n');
    }
}
