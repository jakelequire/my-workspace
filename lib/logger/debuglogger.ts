



export class DebugLogger {
    constructor() {};

    public log(message: string, data?: any) {
        console.log("-----------------------------------------");
        console.log(message);
        console.log("Data:\n");
        console.log(data);
        console.log("-----------------------------------------");
    }

    public endpointHit(endpoint: string, method: string) {
        console.log("-----------------------------------------");
        console.log(`  ###########  ${method}  #############  `)
        console.log(`<!> Endpoint Hit: ${endpoint}`)
        console.log("-----------------------------------------");
    }



}
