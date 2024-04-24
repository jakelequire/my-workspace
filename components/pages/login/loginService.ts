

export default class LoginService {
    constructor() {}

    public async handleSignIn(idToken: string): Promise<boolean | Error>{
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
            credentials: 'include',
        })

        if(!response.ok) {
            const errorMessage = response.text();
            throw new Error(`Error in SignIn: ${errorMessage}`);
        }

        return true;
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
