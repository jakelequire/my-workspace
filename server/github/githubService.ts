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

/*
The ContributionsCollection object provides total contributions for each contribution type between two dates.

Note: from and to can be a maximum of one year apart, for a longer timeframe make multiple requests.

query ContributionsView($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
    contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
    }
}
*/
const DATE_RANGES = [
    {
        from: '2022-10-01T00:00:00Z',
        to: '2022-12-31T00:00:00Z',
    },
    {
        from: '2023-01-01T00:00:00Z',
        to: '2023-12-31T00:00:00Z',
    },
    {
        from: '2024-01-01T00:00:00Z',
        to: '2024-12-31T00:00:00Z',
    },
]

const TOTAL_CONTRIBUTIONS_QUERY = `
    query($userName:String!) {
        user(login: $userName){
            contributionsCollection(from: $from, to: $to) {
                totalCommitContributions
                totalIssueContributions
                totalPullRequestContributions
                totalPullRequestReviewContributions
            }
    }
`;

export class GitHubService {
    octokit = octokit;
    repoitories: GitHubApi.RepoData[];
    commitHistory: [];
    contribution_count: number;

    constructor() {
        this.octokit = octokit;
        this.repoitories = [];
        this.commitHistory = [];
        this.contribution_count = 0;
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
        const query = QUERY;
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

    async totalContributions() {
        const TOKEN = GITHUB_AUTH_TOKEN;
        const query = TOTAL_CONTRIBUTIONS_QUERY;
        const date_variables = DATE_RANGES;

        for(let i = 0; i < date_variables.length; i++) {
            const variables = `
            {
                "userName": "jakelequire"
                "from": "${date_variables[i].from}"
                "to": "${date_variables[i].to}"
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
            const totalContributions =
                response.data.user.contributionsCollection.totalCommitContributions;
            console.log('\ntotalContributions', totalContributions, '\n');
            // update total contribution count
            this.contribution_count += totalContributions.length;
        }

        return this.contribution_count;
    }

    /* -------------------------------------------------------------------------------- */
    /* DEBUGGING */
    async logCommits() {
        const commits = await this.viewCommitsData();
        console.log('\ncommits', commits, '\n');
    }
}
