import { categories, games } from '$/data/games';

import { colors } from './colors';

const groups = [
	{ id: 'playing', label: 'playing now', color: colors.red },
	{ id: 'hold', label: 'on hold', color: colors.yellow },
	{ id: 'completed', label: 'completed', color: colors.tan },
	{ id: 'endless', label: 'no ending', color: colors.blue },
	{ id: 'dropped', label: 'dropped', color: colors.grey },
	{ id: 'backlog', label: 'not started', color: colors.pale },
];

// the statuses are typed by hand, so match them loosely
function groupOf(status: string) {
	const s = status.toLowerCase();
	if (s.startsWith('n/a')) return 'endless';
	if (s === 'in progress') return 'playing';
	if (s === 'on hold') return 'hold';
	if (s === 'not started') return 'backlog';
	return s;
}

function describe(game: (typeof games)[number]) {
	const group = groups.find(g => g.id === groupOf(game.status));
	if (!group)
		throw new Error(`unknown status "${game.status}" on ${game.name}`);
	// "N/A (Online)" -> "online"
	const kind = game.status.match(/\((.+)\)/)?.[1].toLowerCase();
	return {
		name: game.name,
		thoughts: game.thoughts,
		src: game.image.src,
		category: game.category,
		playing: group.id === 'playing',
		color: group.color,
		tag: kind ?? group.label,
	};
}

// one tv network per category, in the order the categories are listed
export const networks = categories.map(name => ({
	name,
	games: games.filter(game => game.category === name).map(describe),
}));

// channels run network by network, so a network's channels sit next to each other
export const channels = networks.flatMap(network => network.games);
