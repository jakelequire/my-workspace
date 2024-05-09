import { GitHubService } from "@/server/github/githubService";


export async function GET(request: Request) {
    const githubService = new GitHubService();

    return await githubService.viewCommitsData()
    .then((commits) => {
        return new Response(JSON.stringify(commits))
    })
    .catch((error) => {
        console.log("[/api/services/github/commits] Error is listing github commits.", error)
        return new Response(JSON.stringify('[/api/services/github/commits] Error fetching commits.'))
    });

}
