import { GitHubApi } from "@/types/servertypes";
import { GitHubService } from "@/server/github/githubService";


export async function GET(request: Request) {


    return new Response(JSON.stringify("Route Not In Use", {
        status: 404
    }));
}
