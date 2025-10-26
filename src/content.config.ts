import { file, glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
	}),
});

const akechi = defineCollection({
	loader: file('./src/data/akechi.txt', {
		parser: text =>
			[...text.split('\n').entries()].flatMap(([line, quote]) => ({
				id: line,
				quote,
			})),
	}),
});

const sites = defineCollection({
	loader: file('./src/data/sites.json'),
	schema: z.object({
		href: z.string(),
		src: z.string(),
		alt: z.string().optional().nullable(),
	}),
});

export const collections = {
	akechi,
	blog,
	sites,
};
