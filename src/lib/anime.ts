// the list comes from the MAL API when the site is built. the key stays on
// the build machine (.env locally, a repo secret on github).
const user = 'mistake_mp4';
const fields =
	'list_status,alternative_titles,num_episodes,media_type,start_season,mean,genres';

interface MalEntry {
	node: {
		id: number;
		title: string;
		main_picture?: { medium: string; large: string };
		alternative_titles?: { en?: string };
		num_episodes?: number;
		media_type?: string;
		start_season?: { year: number; season: string };
		mean?: number;
		genres?: { name: string }[];
	};
	list_status: {
		status: string;
		score: number;
		num_episodes_watched: number;
		updated_at: string;
	};
}

export const statuses = [
	{ id: 'watching', label: 'watching' },
	{ id: 'completed', label: 'completed' },
	{ id: 'on_hold', label: 'on hold' },
	{ id: 'dropped', label: 'dropped' },
	{ id: 'plan_to_watch', label: 'plan to watch' },
];

async function load() {
	const key = import.meta.env.MAL_CLIENT_ID ?? process.env.MAL_CLIENT_ID;
	if (!key) {
		// a deploy without the list would quietly publish an empty page
		if (process.env.CI) throw new Error('MAL_CLIENT_ID is not set');
		console.warn('MAL_CLIENT_ID is not set, the anime list will be empty');
		return [];
	}

	const entries: MalEntry[] = [];
	let url: string | undefined =
		`https://api.myanimelist.net/v2/users/${user}/animelist?limit=1000&nsfw=true&fields=${fields}`;
	while (url) {
		const response: Response = await fetch(url, {
			headers: { 'X-MAL-CLIENT-ID': key },
		});
		if (!response.ok)
			throw new Error(`MAL API answered ${response.status} for the anime list`);
		const page = await response.json();
		entries.push(...page.data);
		url = page.paging?.next;
	}

	return entries.map(({ node, list_status }) => ({
		// MAL's own english title when it has one
		title: node.alternative_titles?.en || node.title,
		url: `https://myanimelist.net/anime/${node.id}`,
		image: node.main_picture?.medium,
		type: node.media_type ?? '',
		year: node.start_season?.year,
		episodes: node.num_episodes ?? 0,
		mean: node.mean,
		genres: (node.genres ?? []).map(genre => genre.name),
		status: list_status.status,
		// 0 = not scored
		score: list_status.score,
	}));
}

export type Anime = Awaited<ReturnType<typeof load>>[number];

// best score first, then by name
export const anime = (await load()).sort(
	(a, b) => b.score - a.score || a.title.localeCompare(b.title),
);
