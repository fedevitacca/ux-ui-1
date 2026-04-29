export const json = (body: unknown, init: ResponseInit = {}) =>
	new Response(JSON.stringify(body), {
		...init,
		headers: {
			'Content-Type': 'application/json',
			...(init.headers ?? {})
		}
	});

export const errorJson = (error: unknown, status = 400) =>
	json({ message: error instanceof Error ? error.message : 'Error inesperado' }, { status });

export const readJsonBody = async (request: Request) => {
	try {
		return await request.json();
	} catch {
		throw new Error('El cuerpo de la solicitud debe ser JSON.');
	}
};
