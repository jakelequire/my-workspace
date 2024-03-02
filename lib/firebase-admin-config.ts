import { initializeApp, getApps, cert } from 'firebase-admin/app';
import * as admin from 'firebase-admin';
const serviceAccount = require('../env/my-workspace-8b9e9-firebase-adminsdk-fmhtp-58f1131ec9.json');

const firebaseAdminConfig = {
    credential: admin.credential.cert(serviceAccount)
}

export function InitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}