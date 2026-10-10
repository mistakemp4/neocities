export interface SitemapEntry {
	href: string;
	label?: string;
	// tree parent, when it differs from the url parent
	parent?: string;
	note?: string;
	// not a file in src/pages (dynamic route or another site), always listed
	extra?: boolean;
	// lists the blog posts under this entry
	posts?: boolean;
}

// optional: names and order for the site map. pages missing here still show up.
export const sitemapEntries: SitemapEntry[] = [
	{ href: '/', label: 'home' },
	{ href: '/blog/1/', label: 'blog', extra: true, posts: true },
	{ href: '/library/' },
	{ href: '/library/favs/' },
	{ href: '/library/games/', label: 'game log' },
	{ href: '/shrines/', parent: '/library/' },
	{ href: '/shrines/akechi/', label: 'Goro Akechi' },
	{ href: '/shrines/souyo/', label: 'SouYo' },
	{ href: '/library/quizzes/', label: 'web quizzes' },
	{ href: '/library/graphics/', label: 'site graphics' },
	{ href: '/library/projects/' },
	{ href: '/library/projects/poketwo/', label: 'Pokétwo spawn odds' },
	{ href: '/about/', label: 'about site' },
	{
		href: 'https://mistakemp4.atabook.org/',
		label: 'guestbook',
		note: 'atabook',
		extra: true,
	},
];
