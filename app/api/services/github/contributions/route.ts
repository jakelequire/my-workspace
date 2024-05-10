import { GitHubService } from "@/server/github/githubService";
import { DebugLogger } from "@/lib/logger/debuglogger";

const logger = new DebugLogger();

export async function GET(request: Request) {
    logger.endpointHit('/api/services/github/commits', 'GET')

    const githubService = new GitHubService();
    return await githubService.totalContributions()
    .then((contributions) => {
        return new Response(JSON.stringify(contributions))
    })
    .catch((error) => {
        console.log("[/api/services/github/commits] Error is listing GitHub Contributions.", error)
        return new Response(JSON.stringify('<!> Error fetching GitHub Contributions'))
    });
}
