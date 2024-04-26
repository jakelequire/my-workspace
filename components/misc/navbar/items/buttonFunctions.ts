
import localForage from '@/localForageConfig';






export default class ButtonFn {
    
    constructor() {};


    public async clearCache() {

    }


    public async clearLocalDb() {
        return await localForage.clear()
    }

}
