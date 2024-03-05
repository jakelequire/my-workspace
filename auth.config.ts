import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/login',
        signOut: '/api/logout',
    },
    callbacks: {
        authorized ({auth, request: { nextUrl }}) {
            const isLoggedIn = !!auth?.user;
            const isOnHomePage = nextUrl.pathname === '/';
            if(isOnHomePage) {
                if(isLoggedIn) return true;
                return false;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl))
            }
            return true;
        },
    },
    providers: []
}