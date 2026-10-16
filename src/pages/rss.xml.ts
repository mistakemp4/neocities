import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

import { getSortedBlogPosts } from '$/lib/blog';

export async function GET(context: APIContext) {
	const posts = await getSortedBlogPosts();

	return rss({
		title: "mistake's blog",
		description: 'posts from mistakemp4.neocities.org',
		site: context.site!,
		items: posts.map(({ id, data, body }) => ({
			title: data.title,
			pubDate: data.date,
			description: (body?.substring(0, 300) ?? '') + '...',
			link: `/blog/post/${id}/`,
		})),
	});
}
