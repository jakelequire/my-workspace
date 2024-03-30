import { VercelService } from "@/server/vercel/vercelService"


export async function GET(request: Request) {
    const vercelService = new VercelService()
    const deployments = await vercelService.listDeployments()

    if(!deployments) {
        return new Response("Error in fetching data.")
    }

    return new Response(JSON.stringify(deployments))
}

