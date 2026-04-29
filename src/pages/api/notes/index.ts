import type { APIRoute } from 'astro';
import { getBearerUser } from '../../../lib/auth';
import { assertDatabase } from '../../../lib/db';
import { errorJson, json, readJsonBody } from '../../../lib/http';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
	try {
		const db = assertDatabase();
		const user = getBearerUser(request);
		const notes = await db`
			select id, user_id, entity_type, entity_name, status, title, body, created_at, updated_at
			from bucks_notes
			where user_id = ${user.id}
			order by updated_at desc
		`;
		return json(notes);
	} catch (error) {
		return errorJson(error, 401);
	}
};

export const POST: APIRoute = async ({ request }) => {
	try {
		const db = assertDatabase();
		const user = getBearerUser(request);
		const body = await readJsonBody(request);
		const note = {
			entityType: String(body.entity_type ?? 'Jugador'),
			entityName: String(body.entity_name ?? '').trim(),
			status: String(body.status ?? 'Observacion'),
			title: String(body.title ?? '').trim(),
			body: String(body.body ?? '').trim()
		};

		if (!note.entityName || !note.title || !note.body) {
			throw new Error('Completa nombre, titulo y detalle.');
		}

		const rows = await db`
			insert into bucks_notes (user_id, entity_type, entity_name, status, title, body)
			values (${user.id}, ${note.entityType}, ${note.entityName}, ${note.status}, ${note.title}, ${note.body})
			returning id, user_id, entity_type, entity_name, status, title, body, created_at, updated_at
		`;

		return json(rows[0], { status: 201 });
	} catch (error) {
		return errorJson(error);
	}
};
