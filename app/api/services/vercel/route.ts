import { VercelService } from "@/server/vercel/vercelService"


export async function GET(request: Request) {
    const vercelService = new VercelService()
    
    return await vercelService.listDeployments()
    .then((deployments) => {
        return new Response(JSON.stringify(deployments))
    })
    .catch((error) => {
        console.log("[/api/services/vercel] Error is listing vercel deployments.", error)
        return new Response(JSON.stringify('<!> Error fetching deployment statuses'))
    });
}

