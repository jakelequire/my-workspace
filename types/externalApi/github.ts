

export namespace GitHub {
    /**
     * @untested
     */
    export interface ListCommits {
        url: string;
        sha: string;
        node_id: string;
        html_url: string;
        comments_url: string;
        commit: {
            url: string;
            author: {
                name: string;
                email: string;
                date: string;
            };
            committer: {
                name: string;
                email: string;
                date: string;
            };
            message: string;
            tree: {
                url: string;
                sha: string;
            };
            comment_count: number;
            verification: {
                verified: boolean;
                reason: string;
                signature: any;
                payload: any;
            };
        };
        author: {
            login: string;
            id: number;
            node_id: string;
            avatar_url: string;
            gravatar_id: string;
            url: string;
            html_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            starred_url: string;
            subscriptions_url: string;
            organizations_url: string;
            repos_url: string;
            events_url: string;
            received_events_url: string;
            type: string;
            site_admin: boolean;
        };
        committer: {
            login: string;
            id: number;
            node_id: string;
            avatar_url: string;
            gravatar_id: string;
            url: string;
            html_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            starred_url: string;
            subscriptions_url: string;
            organizations_url: string;
            repos_url: string;
            events_url: string;
            received_events_url: string;
            type: string;
            site_admin: boolean;
        };
        parents: Array<{
            url: string;
            sha: string;
        }>;
    }
    
    export interface CommitsData {
        data: {
            user: {
                contributionsCollection: {
                    contributionCalendar: {
                        totalContributions: number;
                        weeks: Array<{
                            contributionDays: Array<{
                                color: string;
                                contributionCount: number;
                                date: string;
                                weekday: number;
                            }>;
                            firstDay: string;
                        }>;
                    };
                };
            };
        };
    }

}