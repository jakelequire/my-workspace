import { cookies } from 'next/headers';

/*
Notes:
    - Not sure where to implement / how, but making the class below typesafe.
      Having an interface for each cookie (`userId`, `session`, etc), but
      flattening out the methods into one working interface being `BrowserCookies`.
*/

// Maybe?
// Note: look into another way to simply this process instead of hard coding each of the types
type UserIdCookie = {
    setUserId: (userId: string) => void;
    deleteUserId: (userId: string) => void;
    viewUserId: () => readonly string;
};

type SessionCookie = {
    setSession: (userId: string) => void;
    deleteSession: (userId: string) => void;
    viewSession: () => readonly string;
};

interface BrowserCookies {
    userId: UserIdCookie;
    session: SessionCookie;
}

// TODO:
// This should be the interface to satisfy the `BrowserCookieService` class.
interface CookieService {}; 


export default class BrowserCookieService {

    constructor() {};



    /* ------------------------------------------------ */
    /* ############ User ID Cookie Methods ############ */
    /* ------------------------------------------------ */
    public async setUserId(userId: string): Promise<void>  {
        cookies().set('userId', userId, {
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
            sameSite: 'lax',
            secure: true,
            httpOnly: true,
        })
    }


    public async deleteUserId(userId: string): Promise<void>  {
        const userId = cookies().get('userId');
        if(userId) {
            cookies().delete('userId');
        } else {
            console.log("<BrowserCookies> [deleteUserId] Session Not Found:\n")
        };
    }


    public readonly viewUserId() {
        // TODO
    }

    /* ------------------------------------------------ */
    /* ############ Session Cookie Methods ############ */
    /* ------------------------------------------------ */
    public async setSession(session: any): Promise<void>  {
        cookies().set('session', session, {
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
            sameSite: 'lax',
            secure: true,
            httpOnly: true,
        });
    }


    public async deleteSession(session: any): Promise<void> {
        const session = cookies().get('session');
        if(session) {
            cookies().delete('session');
        } else {
            console.log("<BrowserCookies> [deleteSession] Session Not Found:\n")
        };
    }


    public readonly viewSession() {
        // TODO
    }



}



