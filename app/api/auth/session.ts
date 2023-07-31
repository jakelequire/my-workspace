// /api/auth/session.js
import { Session } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'inspector'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = Session({ req })
    if (session) {
        res.send({ content: "This is protected content. You can access this content because you are signed in." })
    } else {
        res.send({ error: "You must be signed in to view the protected content on this page." })
    }
}