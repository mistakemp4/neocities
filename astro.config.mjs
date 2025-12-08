// @ts-check
import { defineConfig } from 'astro/config';

import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
	trailingSlash: 'always',
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
  experimental: {
    fonts: [{
		name: 'Persona 4',
      provider: 'local',
	  cssVariable: '--font-persona4',
	  variants: [
		{
			src: [ './src/assets/fonts/FOT-SkipStd-B.otf' ],
		},
	  ],
	  fallbacks: [ 'Courier New', 'monospace' ],
    }],
  },

	integrations: [alpinejs()],
});

