// @ts-check
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: vercel(),
	vite: {
		resolve: {
			alias: {
				'astro/entrypoints/prerender': fileURLToPath(
					new URL('./node_modules/astro/dist/entrypoints/prerender.js', import.meta.url)
				)
			}
		}
	}
});
