import crypto from 'crypto';

/*
    4 bytes - timestamp
    4 bytes - random
    4 bytes - counter
    4 bytes - random
*/
export default function IDGen(): string {
    const timestamp = Buffer.alloc(4);
    timestamp.writeUInt32BE(Math.floor(Date.now() / 1000), 0);

    const random1 = crypto.randomBytes(4);

    const counter = Buffer.alloc(4);
    counter.writeUInt32BE(0, 0);

    const random2 = crypto.randomBytes(4);

    return Buffer.concat([timestamp, random1, counter, random2]).toString('base64');
}