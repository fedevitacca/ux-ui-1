import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const localEnv = new Map<string, string>();
let loaded = false;

const loadLocalEnv = () => {
	if (loaded) return;
	loaded = true;

	const envPath = join(process.cwd(), '.env');
	if (!existsSync(envPath)) return;

	const lines = readFileSync(envPath, 'utf8').split(/\r?\n/);
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;

		const separatorIndex = trimmed.indexOf('=');
		if (separatorIndex === -1) continue;

		const key = trimmed.slice(0, separatorIndex).trim();
		let value = trimmed.slice(separatorIndex + 1).trim();
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}

		localEnv.set(key, value);
	}
};

export const getServerEnv = (key: string) => {
	loadLocalEnv();
	return process.env[key] ?? localEnv.get(key) ?? '';
};
