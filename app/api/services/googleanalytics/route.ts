import GoogleAnalyticsService from "@/server/googleAnalytics/googleAnalyticsService"

export async function GET(request: Request) {
    // const googleAnalyticsService = new GoogleAnalyticsService()
    // const data = await googleAnalyticsService.requestData()


    return new Response(JSON.stringify("Hello world!"))
}

