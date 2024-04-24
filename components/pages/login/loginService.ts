

export default class LoginService {
    constructor() {}

    public async handleSignIn(idToken: string): Promise<boolean | Error> {

        /*DEBUG*/ console.log("\n[LoginService] handleSignIn idToken: ", idToken);

        return await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
            credentials: 'include',
        }).then((res) => {
            console.log("\n[LoginService] handleSignIn res: ", res);
            return true;
        }).catch((err: Error) => {
            console.log('\n<!>Error in handleSignIn<!>\n', err);
            return err;
        });
    }


    public async signInError() {
        const response = await fetch('/api/auth/login/loginerror', {
            method: 'POST',
            credentials: 'include',
        })

        if(!response.ok) {
            const errorMessage = response.text();
            throw new Error(`Error in SignInError: ${errorMessage}`);
        }
    }

}
