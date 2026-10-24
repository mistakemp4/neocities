// @ts-check
import alpinejs from '@astrojs/alpinejs';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://mistakemp4.neocities.org',
	trailingSlash: 'always',
	// old links to the profile page land on its replacement
	redirects: {
		'/profile/': '/library/',
		// the game log grew an anime list and got renamed
		'/library/games/': '/library/media/',
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
				// no generic family here, so --font-pixel can add DotGothic16 for japanese
				fallbacks: ['Courier New'],
			},
			{
				// subset to japanese + symbols VT323 lacks, only loads on pages that use them
				name: 'DotGothic16',
				provider: 'local',
				cssVariable: '--font-dotgothic',
				variants: [
					{
						src: ['./src/assets/fonts/DotGothic16-jp.woff2'],
						unicodeRange: [
							'U+0370-03FF',
							'U+2010-2027',
							'U+2030-205E',
							'U+2190-21FF',
							'U+2500-25FF',
							'U+2605-2606',
							'U+2661',
							'U+2665',
							'U+266A-266B',
							'U+3000-30FF',
							'U+31F0-31FF',
							'U+4E00-9FFF',
							'U+FF00-FFEF',
						],
					},
				],
				fallbacks: ['Courier New', 'monospace'],
			},
			{
				name: 'Shippori Mincho B1',
				provider: fontProviders.google(),
				cssVariable: '--font-shippori',
				weights: [500, 800],
				fallbacks: ['Georgia', 'serif'],
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
