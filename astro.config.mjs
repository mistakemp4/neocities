// @ts-check
import { defineConfig } from 'astro/config';

import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
	security: {
		allowedDomains: [
			{
				hostname: 'transring.neocities.org',
				protocol: 'https',
			},
		],
	},
	vite: {
		server: {
			watch: {
				usePolling: true,
			},
		},
	},

	integrations: [alpinejs()],
});
