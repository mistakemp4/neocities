// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
	trailingSlash: 'always',
	// old links to the profile page land on its replacement
	redirects: {
		'/profile/': '/library/',
	},
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
		fonts: [
			{
				name: 'VT323',
				provider: fontProviders.google(),
				cssVariable: '--font-vt323',
				fallbacks: ['Courier New', 'monospace'],
			},
			{
				name: 'Persona 4',
				provider: 'local',
				cssVariable: '--font-persona4',
				variants: [
					{
						src: ['./src/assets/fonts/FOT-SkipStd-B.otf'],
					},
				],
				fallbacks: ['Courier New', 'monospace'],
			},
			{
				name: 'P5 Hatty',
				provider: 'local',
				cssVariable: '--font-p5-body',
				variants: [
					{
						src: ['./src/assets/fonts/p5hatty-1.ttf'],
					},
				],
				fallbacks: ['Georgia', 'serif'],
			},
			{
				name: 'P5 Menu',
				provider: 'local',
				cssVariable: '--font-p5-header',
				variants: [
					{
						src: ['./src/assets/fonts/Persona5MenuFontPrototype-Regular.ttf'],
					},
				],
				fallbacks: ['Impact', 'sans-serif'],
			},
		],
	},

	integrations: [alpinejs()],
});
