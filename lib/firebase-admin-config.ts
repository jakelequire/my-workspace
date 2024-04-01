import { initializeApp, getApps, cert } from 'firebase-admin/app';
import type { ServiceAccount } from 'firebase-admin';
import * as admin from 'firebase-admin';

const serviceAccount: ServiceAccount = {
    projectId: process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_PROJECT_ID,
    clientEmail: process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_CLIENT_EMAIL,
    privateKey: process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Handle newlines for privateKey
};

const firebaseAdminConfig = {
    credential: admin.credential.cert(serviceAccount)
}

export function InitApp() {
    if (getApps().length <= 0) {
        console.log("\nInitializing Firebase Admin\n")
        initializeApp(firebaseAdminConfig);
    } else {
        console.log("\nFirebase Admin already initialized\n")
        admin.app();
        console.log("\n Continuing... \n")
    }
}
