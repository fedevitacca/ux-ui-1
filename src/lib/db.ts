import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL ?? import.meta.env.DATABASE_URL ?? '';

export const sql = databaseUrl ? neon(databaseUrl) : null;

export const assertDatabase = () => {
	if (!sql) {
		throw new Error('DATABASE_URL no esta configurado.');
	}
	return sql;
};
