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
    public async setUserId(userId: string) {


    }


    public async deleteUserId(userId: string) {


    }


    public readonly viewUserId() {


    }

    /* ------------------------------------------------ */
    /* ############ Session Cookie Methods ############ */
    /* ------------------------------------------------ */
    public async setSession(session: any) {


    }


    public async deleteSession(session: any) {


    }


    public readonly viewSession() {


    }



}



