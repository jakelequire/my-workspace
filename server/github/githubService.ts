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
    commitHistory: [];

    constructor() {
        this.octokit = octokit;
        this.repoitories = [];
        this.commitHistory = [];
    }


    /**
     * @see https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#list-commits
     */
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



    /* -------------------------------------------------------------------------------- */
    /* DEBUGGING */
    async logCommits() {
        const commits = await this.viewCommitsData();
        console.log('\ncommits', commits, '\n');
    }

}
