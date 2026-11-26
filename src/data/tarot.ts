// card art: public/tarot/, made by scripts/tarot_cards.py
export interface TarotCard {
	file: string;
	name: string;
	upright: string;
	reversed: string;
}

const majors: [string, string, string][] = [
	[
		'the fool',
		'new starts, a leap of faith, being a little silly',
		'recklessness, hesitating, a leap you arent ready for',
	],
	[
		'the magician',
		'willpower, skill, making it happen',
		'tricks, wasted talent, scattered energy',
	],
	[
		'the high priestess',
		'intuition, secrets, listening inward',
		'ignored gut feelings, hidden motives',
	],
	[
		'the empress',
		'comfort, abundance, taking care of yourself',
		'neglect, smothering, creative block',
	],
	[
		'the emperor',
		'structure, stability, being in charge',
		'control issues, rigidity, stubbornness',
	],
	[
		'the hierophant',
		'tradition, learning, doing it by the book',
		'rebellion, doing it your own way',
	],
	[
		'the lovers',
		'love, harmony, a real choice',
		'imbalance, mixed signals, a bad match',
	],
	[
		'the chariot',
		'drive, focus, winning through effort',
		'no direction, losing control',
	],
	[
		'strength',
		'courage, patience, soft power',
		'self doubt, low energy, short fuse',
	],
	[
		'the hermit',
		'alone time, reflection, looking for answers',
		'isolation, loneliness, hiding away',
	],
	[
		'wheel of fortune',
		'luck, cycles, things turning around',
		'bad luck, resisting change',
	],
	[
		'justice',
		'fairness, truth, cause & effect',
		'unfairness, dodging accountability',
	],
	[
		'the hanged man',
		'pausing, letting go, a new perspective',
		'stalling, being stuck, pointless sacrifice',
	],
	[
		'death',
		'endings, change, making room for something new',
		'holding on, fear of change',
	],
	['temperance', 'balance, patience, moderation', 'excess, imbalance, rushing'],
	[
		'the devil',
		'temptation, bad habits, feeling trapped',
		'breaking free, taking your power back',
	],
	[
		'the tower',
		'sudden change, chaos, things falling apart',
		'avoiding disaster, delaying the inevitable',
	],
	[
		'the star',
		'hope, healing, calm after the storm',
		'discouragement, losing faith',
	],
	[
		'the moon',
		'illusion, anxiety, the unknown',
		'clarity, fears fading, truth coming out',
	],
	[
		'the sun',
		'joy, success, warmth',
		'a cloudy day, joy that takes a moment to find',
	],
	[
		'judgement',
		'awakening, a calling, second chances',
		'self criticism, ignoring the call',
	],
	[
		'the world',
		'completion, wholeness, a journey finished',
		'loose ends, almost there',
	],
];

// ace .. ten, page, knight, queen, king
const ranks = [
	'ace',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
	'ten',
	'page',
	'knight',
	'queen',
	'king',
];

const suits: Record<string, [string, string][]> = {
	wands: [
		['inspiration, a spark, new passion', 'delays, no motivation'],
		[
			'planning, big decisions, the future',
			'fear of the unknown, bad planning',
		],
		['progress, looking ahead, expansion', 'obstacles, setbacks'],
		['celebration, home, harmony', 'tension at home, a cancelled party'],
		[
			'competition, conflict, friction',
			'avoiding conflict, finding common ground',
		],
		['victory, recognition, confidence', 'ego, a fall from grace'],
		[
			'standing your ground, defending yourself',
			'giving up, feeling overwhelmed',
		],
		[
			'speed, movement, things happening fast',
			'waiting, frustration, bad timing',
		],
		['resilience, one last push', 'exhaustion, paranoia'],
		['burden, too much on your plate', 'putting stuff down, delegating'],
		['curiosity, enthusiasm, a new idea', 'impatience, ideas going nowhere'],
		['adventure, action, energy', 'rushing in, recklessness'],
		['confidence, warmth, determination', 'jealousy, insecurity'],
		['leadership, vision, big goals', 'impulsiveness, being bossy'],
	],
	cups: [
		['new feelings, love, an open heart', 'bottled up feelings, emptiness'],
		['partnership, connection, mutual love', 'a falling out, imbalance'],
		['friendship, celebration, community', 'gossip, too much partying'],
		['apathy, boredom, missed chances', 'new interest, finally noticing'],
		['loss, regret, grief', 'acceptance, moving on'],
		['nostalgia, childhood, sweet memories', 'stuck in the past'],
		['daydreams, too many choices, illusions', 'clarity, making a choice'],
		['walking away, looking for more', 'fear of leaving, aimlessness'],
		['wishes coming true, satisfaction', 'greed, an empty win'],
		['happiness, family, harmony', 'disconnection, broken plans'],
		[
			'creativity, a sweet message, intuition',
			'emotional immaturity, blocked creativity',
		],
		['romance, charm, following your heart', 'moodiness, unrealistic plans'],
		['compassion, care, emotional security', 'insecurity, codependence'],
		['emotional balance, kindness, calm', 'manipulation, moodiness'],
	],
	swords: [
		['clarity, a breakthrough, truth', 'confusion, chaos'],
		['a stalemate, a hard choice', 'too much information, indecision'],
		['heartbreak, grief, painful truth', 'healing, forgiveness'],
		['rest, recovery, taking a break', 'burnout, restlessness'],
		['conflict, winning at a cost', 'making peace, regret'],
		['moving on, leaving trouble behind', 'unfinished business, stuck'],
		[
			'sneaking around, strategy, getting away with it',
			'getting caught, coming clean',
		],
		['feeling trapped, self doubt', 'freedom, new perspective'],
		['anxiety, nightmares, overthinking', 'hope, reaching out'],
		['rock bottom, a painful ending', 'recovery, it can only get better'],
		['curiosity, new ideas, wit', 'gossip, all talk'],
		['ambition, charging ahead, fast thinking', 'rushing, no plan'],
		['honesty, independence, clear boundaries', 'coldness, bitterness'],
		['intellect, authority, truth', 'abuse of power, manipulation'],
	],
	pentacles: [
		[
			'a new opportunity, money, a solid start',
			'a missed chance, bad investment',
		],
		['juggling, balance, adaptability', 'overwhelm, overcommitting'],
		['teamwork, learning, building something', 'no teamwork, sloppy work'],
		['saving, security, holding on', 'greed, spending too much'],
		['hard times, feeling left out', 'recovery, help arriving'],
		['generosity, giving & receiving', 'strings attached, debt'],
		['patience, long term effort', 'impatience, wasted effort'],
		['practice, skill, hard work', 'perfectionism, cutting corners'],
		['independence, comfort, self worth', 'overworking, setbacks'],
		['family, legacy, long term wealth', 'family drama, money trouble'],
		['ambition, studying, a new skill', 'procrastination, no progress'],
		['hard work, routine, reliability', 'boredom, feeling stuck'],
		[
			'nurturing, practicality, a cozy home',
			'self care neglect, work home imbalance',
		],
		['success, security, abundance', 'greed, being too controlling'],
	],
};

const pad = (n: number) => String(n).padStart(2, '0');

export const deck: TarotCard[] = [
	...majors.map(([name, upright, reversed], i) => ({
		file: `${pad(i)}_${name.replace(/^the /, '').replaceAll(' ', '_')}`,
		name,
		upright,
		reversed,
	})),
	...Object.entries(suits).flatMap(([suit, cards]) =>
		cards.map(([upright, reversed], i) => ({
			file: `${suit}_${pad(i + 1)}`,
			name: `${ranks[i]} of ${suit}`,
			upright,
			reversed,
		})),
	),
];
