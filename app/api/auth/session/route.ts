import getUserData from '@/db/collections/userData';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
	await NextCors(req, res, {
		// Options
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200,
	});

	const {uid} = req.query;
	console.log('GET | <uid>', uid);
	if (!uid) {
		res.status(400).json({error: 'Missing uid'});
		return;
	}

	// Instantiate userData after confirming uid exists.
	const userData = new getUserData(uid as string);

	userData
		.getUserData()
		.then((data) => {
			console.log('GET | <data>', data);
			res.status(200).json(data);
		})
		.catch((error) => {
			console.log('GET | <error>', error);
			res.status(500).json({error: error});
		});

	return;
}
