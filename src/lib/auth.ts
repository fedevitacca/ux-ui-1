import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from 'node:crypto';

export type AuthUser = {
	id: string;
	email: string;
};

const getSecret = () => process.env.AUTH_SECRET ?? import.meta.env.AUTH_SECRET ?? '';

const toBase64Url = (value: Buffer | string) =>
	Buffer.from(value).toString('base64url');

const fromBase64Url = (value: string) =>
	Buffer.from(value, 'base64url').toString('utf8');

export const hashPassword = (password: string) => {
	const salt = randomBytes(16).toString('hex');
	const hash = pbkdf2Sync(password, salt, 120000, 32, 'sha256').toString('hex');
	return `pbkdf2$${salt}$${hash}`;
};

export const verifyPassword = (password: string, storedHash: string) => {
	const [, salt, expectedHash] = storedHash.split('$');
	if (!salt || !expectedHash) return false;

	const actualHash = pbkdf2Sync(password, salt, 120000, 32, 'sha256');
	const expected = Buffer.from(expectedHash, 'hex');
	return expected.length === actualHash.length && timingSafeEqual(expected, actualHash);
};

export const createToken = (user: AuthUser) => {
	const secret = getSecret();
	if (!secret) {
		throw new Error('AUTH_SECRET no esta configurado.');
	}

	const header = toBase64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
	const payload = toBase64Url(
		JSON.stringify({
			sub: user.id,
			email: user.email,
			exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
		})
	);
	const signature = createHmac('sha256', secret).update(`${header}.${payload}`).digest('base64url');
	return `${header}.${payload}.${signature}`;
};

export const verifyToken = (token: string): AuthUser => {
	const secret = getSecret();
	if (!secret) {
		throw new Error('AUTH_SECRET no esta configurado.');
	}

	const [header, payload, signature] = token.split('.');
	if (!header || !payload || !signature) {
		throw new Error('Token invalido.');
	}

	const expected = createHmac('sha256', secret).update(`${header}.${payload}`).digest('base64url');
	const expectedBuffer = Buffer.from(expected);
	const signatureBuffer = Buffer.from(signature);
	if (
		expectedBuffer.length !== signatureBuffer.length ||
		!timingSafeEqual(expectedBuffer, signatureBuffer)
	) {
		throw new Error('Token invalido.');
	}

	const data = JSON.parse(fromBase64Url(payload));
	if (!data.sub || !data.email || Number(data.exp) < Math.floor(Date.now() / 1000)) {
		throw new Error('Sesion vencida.');
	}

	return {
		id: data.sub,
		email: data.email
	};
};

export const getBearerUser = (request: Request) => {
	const authHeader = request.headers.get('authorization') ?? '';
	const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
	if (!token) {
		throw new Error('Sesion requerida.');
	}
	return verifyToken(token);
};
