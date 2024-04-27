
import localForage from '@/localForageConfig';






export default class ButtonFn {
    
    constructor() {};


    public async clearCache() {

    }

    public async clearCookies() {
        const response = await fetch("/api/auth/", {
            method: 'POST',
            headers: {
                
            }
        })

        if(!response.ok) {
            throw new Error("<ButtonFn> [clearCookies]: Error in fetch.")
        }

        

    }


    public async clearLocalDb() {
        return await localForage.clear()
    }

}
