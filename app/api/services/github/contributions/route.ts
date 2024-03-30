import { GitHubService } from "@/server/github/githubService";
import { DebugLogger } from "@/lib/logger/debuglogger";

const logger = new DebugLogger();

export async function GET(request: Request) {
    logger.endpointHit('/api/services/github/commits', 'GET')

    // const githubService = new GitHubService();
    // const data = await githubService.totalContributions();
    // // console.log('\n[githubService] fullCommitHistory\n', data, '\n');
// 
    // return new Response(JSON.stringify(data), {
    //     headers: {
    //         'content-type': 'application/json',
    //     },
    // });


    return new Response(JSON.stringify("Hello World!"))
}
