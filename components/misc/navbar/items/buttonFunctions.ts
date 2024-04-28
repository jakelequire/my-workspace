
import localForage from '@/localForageConfig';





export default class ButtonFn {
    
    constructor() {};


    public async clearCache() {

    }

    public async clearCookies() {

        const response = await fetch("/api/auth/cookies", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            mode: 'same-origin',
        })

        if(!response.ok) {
            throw new Error("<ButtonFn> [clearCookies]: Error in fetch.")
        }

        const res = await response.json()
        console.log("{DEBUG} [ButtonFn] [clearCookies]: ", res);
        
        return res
    }


    public async clearLocalDb() {
        return await localForage.clear( )
    }

}
