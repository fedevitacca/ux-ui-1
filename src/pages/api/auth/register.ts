import type { APIRoute } from 'astro';
import { createToken, hashPassword } from '../../../lib/auth';
import { assertDatabase } from '../../../lib/db';
import { errorJson, json, readJsonBody } from '../../../lib/http';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		const db = assertDatabase();
		const body = await readJsonBody(request);
		const email = String(body.email ?? '').trim().toLowerCase();
		const password = String(body.password ?? '');

		if (!email.includes('@')) throw new Error('Email invalido.');
		if (password.length < 6) throw new Error('La clave debe tener al menos 6 caracteres.');

		const users = await db`
			insert into bucks_users (email, password_hash)
			values (${email}, ${hashPassword(password)})
			returning id, email
		`;
		const user = users[0];
		const accessToken = createToken(user);

		return json({ access_token: accessToken, user });
	} catch (error) {
		const message = error instanceof Error ? error.message : '';
		if (message.includes('duplicate key')) {
			return errorJson(new Error('Ese email ya esta registrado.'), 409);
		}
		return errorJson(error);
	}
};
