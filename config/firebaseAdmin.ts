import * as admin from 'firebase-admin';

const serviceAccount = require('for-interview-2023-firebase-adminsdk-b496o-be89b82563.json');

if (!admin.app.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://for-interview-2023-default-rtdb.asia-southeast1.firebasedatabase.app',
    });
}

export { admin }