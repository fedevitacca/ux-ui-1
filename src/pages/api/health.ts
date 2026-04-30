import type { APIRoute } from 'astro';
import { assertDatabase } from '../../lib/db';
import { getServerEnv } from '../../lib/env';
import { errorJson, json } from '../../lib/http';

export const prerender = false;

export const GET: APIRoute = async () => {
	try {
		if (!getServerEnv('AUTH_SECRET')) {
			throw new Error('AUTH_SECRET no esta configurado.');
		}

		const db = assertDatabase();
		await db`select 1`;

		return json({ ok: true, database: 'connected' });
	} catch (error) {
		return errorJson(error, 503);
	}
};
