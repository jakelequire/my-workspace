import { GitHubApi } from "@/types/servertypes";
import { GitHubService } from "@/server/github/githubService";


export async function GET(request: Request) {
    const githubService = new GitHubService();

    const fetchDeploymentStatuses: GitHubApi.ClientResponse = await githubService.fetchDeploymentStatuses();
    if (!fetchDeploymentStatuses) { return new Response('Error fetching deployment statuses')}

    githubService.logCommits();

    return new Response(JSON.stringify(fetchDeploymentStatuses));
}
