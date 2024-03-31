


const FIREBASE_APP_ID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const APP_INSTANCE_ID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

export default class GoogleAnalyticsService {
    constructor() {}

    public async requestData() {
        return await fetch(
            `https://www.google-analytics.com/mp/collect?firebase_app_id=${FIREBASE_APP_ID}&api_secret=${FIREBASE_API_KEY}`,
            {
                method: 'POST',
                body: JSON.stringify({
                    app_instance_id:  APP_INSTANCE_ID,
                }),
            }
        ).then((res) => {
            console.log("[GoogleAnalyticsService] requestData res: ", res);
            const response = res.json();
            console.log("[GoogleAnalyticsService] requestData response: ", response);
            return response;
        }).catch((err) => {
            console.error("[GoogleAnalyticsService] requestData error: ", err);
            throw new Error(err);
        });
    }
}
