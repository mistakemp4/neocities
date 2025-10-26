import { defineCollection, z } from "astro:content";
import { file, glob } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/data/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
    }),
});

const akechi = defineCollection({
    loader: file('./src/data/akechi.txt', {
        parser: text => [...text.split('\n').entries()]
            .flatMap(([line, quote]) => ({id: line, quote})),
    }),
});

export const collections = {
    akechi,
    blog,
};