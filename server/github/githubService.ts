import { format } from 'date-fns';
import { Octokit } from 'octokit';
import { GitHubApi } from '@/types/servertypes';
import { ExternalApi } from '@/types/apiTypes';

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

const DATE_RANGES = [
    // 2022
    {
        from: '2022-08-01T00:00:00Z',
        to: '2022-12-31T00:00:00Z',
    },
    // 2023
    {
        from: '2023-01-01T00:00:00Z',
        to: '2023-12-31T00:00:00Z',
    },
    // 2024
    {
        from: '2024-01-01T00:00:00Z',
        to: '2024-12-31T00:00:00Z',
    },
];

const TOTAL_CONTRIBUTIONS_QUERY = `
query ($userName: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $userName) {
        email
        createdAt
        contributionsCollection(from: $from , to: $to) {
            contributionCalendar {
                totalContributions
                weeks {
                    contributionDays {
                        weekday
                        date 
                        contributionCount 
                        color
                    }
                }
                months  {
                    name
                    year
                    firstDay 
                    totalWeeks 
                }
            }
        }
    }
}
`;

export class GitHubService {
    octokit = octokit;
    repoitories: GitHubApi.RepoData[];
    commitHistory: GitHubApi.CommitHistory;
    contribution_count: GitHubApi.ContributionCount;

    constructor() {
        this.octokit = octokit;
        this.repoitories = [];
        this.commitHistory = {} as GitHubApi.CommitHistory;
        this.contribution_count = {
            total: 0,
            year: {
                '2022': 0,
                '2023': 0,
                '2024': 0,
            },
        };
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

        const response: ExternalApi.GitHub.CommitsData = await res.json();

        const clientResponse = {
            totalContributions:
                response.data.user.contributionsCollection.contributionCalendar.totalContributions,
            weeks: response.data.user.contributionsCollection.contributionCalendar.weeks,
        };

        const commitHistory = clientResponse.weeks.flatMap((week) => {
            return week.contributionDays.map((day) => ({
                day: day.date,
                value: day.contributionCount,
            }));
        });
        return response;
    }

    /**
     * @description Fetches the total contributions made by the user
     */
    public async totalContributions(): Promise<GitHubApi.ContributionCount> {
        const TOKEN = GITHUB_AUTH_TOKEN;
        const query = TOTAL_CONTRIBUTIONS_QUERY;

        try {
            for (let i = 0; i < DATE_RANGES.length; i++) {
                const variables = `
                    {
                        "userName": "jakelequire",
                        "from": "${DATE_RANGES[i].from}",
                        "to": "${DATE_RANGES[i].to}"
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

                const response: ExternalApi.GitHub.CommitsData = await res.json();
                const contributionNum =
                    response.data.user.contributionsCollection.contributionCalendar.totalContributions;

                this.contribution_count.year = {
                    ...this.contribution_count.year,
                    [`${2022 + i}`]: contributionNum,
                };
            }

            this.contribution_count.total =
                this.contribution_count.year['2022'] +
                this.contribution_count.year['2023'] +
                this.contribution_count.year['2024'];

            return this.contribution_count;
        } catch (error) {
            throw new Error(`Error in fetching data: ${error}`);
        }
    }

    /* -------------------------------------------------------------------------------- */
    /* DEBUGGING */
    async logCommits() {
        const commits = await this.viewCommitsData();
        console.log('\ncommits', commits, '\n');
    }
}
