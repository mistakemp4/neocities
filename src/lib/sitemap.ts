import { sitemapEntries } from '$/data/sitemap';

export interface SitemapNode {
	href: string;
	label: string;
	note?: string;
	external: boolean;
	posts: boolean;
	children: SitemapNode[];
}

// keys only, the pages are never imported
const pageFiles = Object.keys(import.meta.glob('/src/pages/**/*.astro'));

function toRoute(file: string): string | undefined {
	const path = file.replace(/^\/src\/pages\//, '').replace(/\.astro$/, '');
	const parts = path.split('/');
	if (
		path.includes('[') ||
		path === '404' ||
		parts.some(part => part.startsWith('_'))
	) {
		return undefined;
	}
	const route = path.replace(/(^|\/)index$/, '');
	return route ? `/${route}/` : '/';
}

function isExternal(href: string): boolean {
	return !href.startsWith('/');
}

function urlParent(href: string): string {
	if (isExternal(href)) return '/';
	const parts = href.split('/').filter(Boolean);
	return parts.length > 1 ? `/${parts.slice(0, -1).join('/')}/` : '/';
}

function defaultLabel(href: string): string {
	return href.split('/').filter(Boolean).at(-1)?.replaceAll('-', ' ') ?? 'home';
}

export function buildSitemap(): SitemapNode {
	const routes = new Set(
		pageFiles.map(toRoute).filter(route => route !== undefined),
	);
	const entries = new Map(sitemapEntries.map(entry => [entry.href, entry]));

	// listed pages keep their order, new pages follow alphabetically
	const hrefs = [
		...sitemapEntries
			.filter(entry => entry.extra || routes.has(entry.href))
			.map(entry => entry.href),
		...[...routes].filter(route => !entries.has(route)).toSorted(),
	];

	const nodes = new Map<string, SitemapNode>(
		hrefs.map(href => {
			const entry = entries.get(href);
			return [
				href,
				{
					href,
					label: entry?.label ?? defaultLabel(href),
					note: entry?.note,
					external: isExternal(href),
					posts: entry?.posts ?? false,
					children: [],
				},
			];
		}),
	);

	const root = nodes.get('/');
	if (!root) throw new Error('site map: src/pages/index.astro is missing');

	for (const node of nodes.values()) {
		if (node === root) continue;
		let parent = entries.get(node.href)?.parent ?? urlParent(node.href);
		// no index page at that level: hang it one level up
		while (!nodes.has(parent) || parent === node.href)
			parent = urlParent(parent);
		nodes.get(parent)?.children.push(node);
	}

	return root;
}
