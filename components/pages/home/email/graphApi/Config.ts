import { LogLevel } from '@azure/msal-browser';


export const config = {
    appId: '1cf6318d-254e-4e01-bf91-9bc3e25dd772',
    redirectUri: 'http://localhost:3000/api/auth/microsoft',
    scopes: [
        'user.read', 
        'mailboxsettings.readwrite', 
        'calendars.readwrite',
        'mail.readwrite',
    ],
};

const redirectUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/home/email' : 'https://workspace-phi.vercel.app/home/email';
console.log('redirectUrl: ', redirectUrl);
export const msalConfig = {
    auth: {
        clientId: '1cf6318d-254e-4e01-bf91-9bc3e25dd772',
        authority: 'https://login.microsoftonline.com/common',
        redirectUri: redirectUrl,
        clientSecret: '1c1b5a6d-c730-4fde-96a4-35e721cc3812',
        navigateToLoginRequestUrl: true,
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false,
    },
    // system: {
    //     loggerOptions: {
    //         loggerCallback: (
    //             level: LogLevel,
    //             message: string,
    //             containsPii: boolean
    //         ): void => {
    //             if (containsPii) {
    //                 return;
    //             }
    //             switch (level) {
    //                 case LogLevel.Error:
    //                     console.error(message);
    //                     return;
    //                 case LogLevel.Info:
    //                     console.info(message);
    //                     return;
    //                 case LogLevel.Verbose:
    //                     console.debug(message);
    //                     return;
    //                 case LogLevel.Warning:
    //                     console.warn(message);
    //                     return;
    //             }
    //         },
    //         piiLoggingEnabled: false,
    //     },
    //     windowHashTimeout: 60000,
    //     iframeHashTimeout: 6000,
    //     loadFrameTimeout: 0,
    //     asyncPopups: false,
    // },
};
export default config;
