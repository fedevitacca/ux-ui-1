import { neon } from '@neondatabase/serverless';
import { getServerEnv } from './env';

const databaseUrl = getServerEnv('DATABASE_URL');

export const sql = databaseUrl ? neon(databaseUrl) : null;

export const assertDatabase = () => {
	if (!sql) {
		throw new Error('DATABASE_URL no esta configurado.');
	}
	return sql;
};
