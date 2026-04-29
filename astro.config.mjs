// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

// https://astro.build/config
export default defineConfig({
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
