import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>(
	'/src/assets/shrines/eva/*.webp',
	{ eager: true },
);

export const evaStills: Record<string, ImageMetadata> = Object.fromEntries(
	Object.entries(files).map(([path, mod]) => [
		path.split('/').at(-1)!.replace('.webp', ''),
		mod.default,
	]),
);

const MEDIA = 'https://mistakemp4.github.io/shrine-media';

export function evaClipUrl(id: string): string {
	return `${MEDIA}/eva/eva-26-${id}.mp4`;
}

export const evaSongUrl = `${MEDIA}/eva/fly-me-to-the-moon.m4a`;
