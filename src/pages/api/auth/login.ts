import type { APIRoute } from 'astro';
import { createToken, verifyPassword } from '../../../lib/auth';
import { assertDatabase } from '../../../lib/db';
import { errorJson, json, readJsonBody } from '../../../lib/http';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		const db = assertDatabase();
		const body = await readJsonBody(request);
		const email = String(body.email ?? '').trim().toLowerCase();
		const password = String(body.password ?? '');
		const users = await db`
			select id, email, password_hash
			from bucks_users
			where email = ${email}
			limit 1
		`;
		const user = users[0];

		if (!user || !verifyPassword(password, user.password_hash)) {
			throw new Error('Email o clave incorrectos.');
		}

		return json({
			access_token: createToken({ id: user.id, email: user.email }),
			user: { id: user.id, email: user.email }
		});
	} catch (error) {
		return errorJson(error, 401);
	}
};
