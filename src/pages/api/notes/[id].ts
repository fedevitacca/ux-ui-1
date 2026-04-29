import type { APIRoute } from 'astro';
import { getBearerUser } from '../../../lib/auth';
import { assertDatabase } from '../../../lib/db';
import { errorJson, json, readJsonBody } from '../../../lib/http';

export const prerender = false;

export const PATCH: APIRoute = async ({ params, request }) => {
	try {
		const db = assertDatabase();
		const user = getBearerUser(request);
		const id = params.id ?? '';
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
			update bucks_notes
			set entity_type = ${note.entityType},
				entity_name = ${note.entityName},
				status = ${note.status},
				title = ${note.title},
				body = ${note.body},
				updated_at = now()
			where id = ${id} and user_id = ${user.id}
			returning id, user_id, entity_type, entity_name, status, title, body, created_at, updated_at
		`;

		if (!rows[0]) throw new Error('Apunte no encontrado.');
		return json(rows[0]);
	} catch (error) {
		return errorJson(error);
	}
};

export const DELETE: APIRoute = async ({ params, request }) => {
	try {
		const db = assertDatabase();
		const user = getBearerUser(request);
		const id = params.id ?? '';
		const rows = await db`
			delete from bucks_notes
			where id = ${id} and user_id = ${user.id}
			returning id
		`;

		if (!rows[0]) throw new Error('Apunte no encontrado.');
		return json({ ok: true });
	} catch (error) {
		return errorJson(error);
	}
};
