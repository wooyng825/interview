import * as admin from 'firebase-admin';

const serviceAccount = require('for-interview-2023-firebase-adminsdk-b496o-a98e962aae.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://for-interview-2023-default-rtdb.asia-southeast1.firebasedatabase.app',
    });
}

export { admin }