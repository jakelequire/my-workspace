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
    viewUserId: () => string;
};

type SessionCookie = {
    setSession: (userId: string) => void;
    deleteSession: (userId: string) => void;
    viewSession: () => string;
};

interface BrowserCookies {
    userId: UserIdCookie;
    session: SessionCookie;
}

// TODO:
// This should be the interface to satisfy the `BrowserCookieService` class.
interface CookieService {}

type CookieOptions = {
    maxAge?: number;
    path?: string;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
};

interface Cookie {
    name: string;
    value: string;
    path: string;
}

export default class BrowserCookieService {
    private headers: Headers;

    constructor(headers: Headers) {
        this.headers = headers;
    }

    getCookie(name: string): string | undefined {
        const cookies = this.headers
            .get('cookie')
            ?.split(';')
            .reduce((acc, cookie) => {
                const [key, value] = cookie.split('=').map((c) => c.trim());
                acc[key] = decodeURIComponent(value);
                return acc;
            }, {} as Record<string, string>);
        return cookies?.[name];
    }

    setCookie(name: string, value: string, options: CookieOptions): void {
        const opts: string[] = [
            `Path=${options.path ?? '/'}`,
            `Max-Age=${options.maxAge ?? 3600}`, // Default to 1 hour
            options.httpOnly ? 'HttpOnly' : '',
            options.secure ? 'Secure' : '',
            `SameSite=${options.sameSite ?? 'lax'}`,
        ];
        this.headers.append(
            'Set-Cookie',
            `${name}=${encodeURIComponent(value)}; ${opts.join('; ')}`
        );
        console.log("[DEBUG] [BrowserCookieService] Successfully set cookie.");
    }

    deleteCookie(name: string): void {
        this.setCookie(name, '', { maxAge: -1 });
    }

    /* ------------------------------------------------ */
    /* ############## Cookie Validation ############### */
    /* ------------------------------------------------ */
    private async foo() {}

    /* ------------------------------------------------ */
    /* ############ User ID Cookie Methods ############ */
    /* ------------------------------------------------ */
    public userId() {
        // Note: Will these work as methods to make grouping of the methods easier to work with / add more in the future
        const setUserId = (): Promise<void> => {
            return Promise.resolve();
        };

        const deleteUserId = (): Promise<void> => {
            return Promise.resolve();
        };

        const viewUserId = '';

        return {
            setUserId,
            deleteUserId,
            viewUserId,
        };
    }

    /* ------------------------------------------------ */
    /* ############ Session Cookie Methods ############ */
    /* ------------------------------------------------ */
    public session() {
        const setSession = (): Promise<void> => {
            return Promise.resolve();
        };

        const deleteSession = (): Promise<void> => {
            return Promise.resolve();
        };

        const viewSession = '';

        return {
            setSession,
            deleteSession,
            viewSession,
        };
    }
}
