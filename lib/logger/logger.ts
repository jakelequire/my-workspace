
export default class Logger {
    constructor() {};
    public static log(message: string, data?: any) {
        console.log("----------------------------------------");
        console.log(message);
        console.log("Data:\n");
        console.log(data);
        console.log("----------------------------------------");
    }

}