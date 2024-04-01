
// import serviceaccount from '@/env/serviceaccount.json'

const FIREBASE_APP_ID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const APP_INSTANCE_ID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

export default class GoogleAnalyticsService {
    constructor() {}

    public async requestData() {
        return await fetch(
            `https://${FIREBASE_PROJECT_ID}.firebaseio/users/jack/name.json?access_token=${FIREBASE_API_KEY}`
        ).then((res) => {
            console.log("[GoogleAnalyticsService.ts] res: ", res)
            const response = res.json()
            console.log("[GoogleAnalyticsService.ts] response: ", response)
            return response
        }).catch((error) => {
            console.error("[GoogleAnalyticsService.ts] error: ", error)
        });
    }
}
