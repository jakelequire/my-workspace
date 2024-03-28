import { GitHubApi } from "@/types/servertypes";
import { GitHubService } from "@/server/github/githubService";


export async function GET(request: Request) {
    const githubService = new GitHubService();

    const fetchCommitsData = await githubService.viewCommitsData();
    if (!fetchCommitsData) { return new Response('Error fetching deployment statuses')}

    githubService.logDeploymentData();

    return new Response(JSON.stringify(fetchCommitsData));
}
