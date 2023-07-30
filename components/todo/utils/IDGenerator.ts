import crypto from 'crypto';

export default function IDGenerator(): string {
    const id = crypto.randomBytes(16).toString('hex');

    return id;
}