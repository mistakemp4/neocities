import results from './sealquiz-results.json';

export { results };

export const quizUrl = 'https://mistakemp4.neocities.org/library/seal-quiz/';
export const wiki = 'https://camp2.rectangle.zone/wiki/';

export type SealId = (typeof results)[number]['id'];

// a little visual joke on one answer, styled in SealQuiz.astro
export type Fx =
	| 'zalgo'
	| 'shake'
	| 'jump'
	| 'round'
	| 'stairs'
	| 'escape'
	| 'fade'
	| 'blur'
	| 'mold'
	| 'error'
	| 'melon'
	| 'cement'
	| 'bounce'
	| 'wobble'
	| 'glitch'
	| 'corporate'
	| 'stripes'
	| 'tilt'
	| 'velvet'
	| 'royal'
	| 'stamp'
	| 'wanted'
	| 'fall'
	| 'sun'
	| 'cite'
	| 'block'
	| 'whisper';

export interface Answer {
	text: string;
	// one answer can count for more than one seal
	for: SealId[];
	fx?: Fx;
}

export interface Question {
	text: string;
	answers: Answer[];
}

export const questions: Question[] = [
	{
		text: 'your d&d character is',
		answers: [
			{
				text: 'a warlock who made a pact with cement',
				for: ['niko', 'damnseal'],
			},
			{
				text: 'the cleric. someone has to heal these people',
				for: ['ponsuke', 'yochan'],
			},
			{ text: 'a bard who only plays drinking songs', for: ['agu', 'bobo'] },
			{ text: 'a rogue (obviously)', for: ['hiyori'], fx: 'whisper' },
			{
				text: 'a barbarian. jump first, ask later',
				for: ['yochan', 'hiyori'],
				fx: 'jump',
			},
			{
				text: 'a wild magic sorcerer who keeps exploding the party',
				for: ['damnseal', 'agu'],
				fx: 'shake',
			},
			{ text: 'the npc everyone keeps killing', for: ['bobo'], fx: 'fade' },
			{
				text: 'an artificer selling potions to the party at a markup',
				for: ['snacksuke'],
			},
		],
	},
	{
		text: 'you wake up in the velvet room. you:',
		answers: [
			{ text: 'lick the velvet', for: ['niko', 'ponsuke'], fx: 'velvet' },
			{ text: "compliment igor's nose. sincerely", for: ['ponsuke', 'bobo'] },
			{ text: 'ask where the open bar is', for: ['agu'] },
			{
				text: 'pocket the tarot cards on the way out',
				for: ['hiyori', 'snacksuke'],
			},
			{ text: 'squint at igor until he leaves', for: ['yochan'] },
			{
				text: 'fuse 400 personas until the game crashes',
				for: ['damnseal', 'niko'],
				fx: 'glitch',
			},
			{
				text: "ask about the room's resale value",
				for: ['snacksuke'],
				fx: 'corporate',
			},
		],
	},
	{
		text: 'your minecraft house is',
		answers: [
			{
				text: 'gray concrete. just gray concrete',
				for: ['niko'],
				fx: 'cement',
			},
			{ text: 'a giant watermelon', for: ['ponsuke', 'yochan'], fx: 'melon' },
			{
				text: 'a castle with a throne & a bar',
				for: ['agu', 'snacksuke'],
				fx: 'block',
			},
			{ text: "someone else's house", for: ['hiyori'] },
			{
				text: "a crater. it's round",
				for: ['yochan', 'niko', 'damnseal'],
				fx: 'round',
			},
			{ text: 'tnt (it was a house)', for: ['damnseal', 'bobo'], fx: 'zalgo' },
			{ text: 'a villager trading empire', for: ['snacksuke'] },
		],
	},
	{
		text: 'not to be confused with',
		answers: [
			{ text: 'a wet rock', for: ['niko', 'yochan'] },
			{ text: 'a marshmallow', for: ['ponsuke', 'yochan'], fx: 'round' },
			{ text: 'a former king of portugal', for: ['agu'], fx: 'royal' },
			{ text: 'the getaway driver', for: ['hiyori', 'agu'], fx: 'escape' },
			{ text: 'an error message', for: ['damnseal'], fx: 'error' },
			{ text: 'nicolai poliakoff, a clown', for: ['bobo'], fx: 'wobble' },
			{ text: 'a snack brand', for: ['snacksuke', 'ponsuke'], fx: 'corporate' },
		],
	},
	{
		text: 'how were you discovered',
		answers: [
			{ text: 'by smell', for: ['niko'], fx: 'mold' },
			{ text: 'on a postcard', for: ['ponsuke'], fx: 'stamp' },
			{ text: 'at the afterparty', for: ['agu', 'hiyori'], fx: 'tilt' },
			{ text: 'on a wanted poster', for: ['hiyori', 'niko'], fx: 'wanted' },
			{ text: 'mid-jump', for: ['yochan'], fx: 'jump' },
			{ text: 'in the crash logs', for: ['damnseal'], fx: 'error' },
			{
				text: 'at the bottom of the stairs',
				for: ['bobo', 'damnseal'],
				fx: 'stairs',
			},
			{ text: 'in the 1859 census', for: ['snacksuke'] },
		],
	},
	{
		text: 'notable achievements',
		answers: [
			{ text: 'outlived the cement', for: ['niko'], fx: 'cement' },
			{ text: 'made a stranger cry (good)', for: ['ponsuke', 'bobo'] },
			{ text: '3 consecutive afterparties', for: ['agu'], fx: 'tilt' },
			{ text: 'escaped. twice', for: ['hiyori'], fx: 'escape' },
			{ text: 'jumped very high, once', for: ['yochan', 'bobo'], fx: 'jump' },
			{ text: 'brought down a website', for: ['damnseal'], fx: 'fall' },
			{
				text: 'became a public company',
				for: ['snacksuke', 'agu'],
				fx: 'corporate',
			},
		],
	},
	{
		text: 'someone is mad at you. you:',
		answers: [
			{ text: 'commit tax evasion about it', for: ['niko', 'snacksuke'] },
			{
				text: 'smile until it goes away',
				for: ['ponsuke', 'bobo'],
				fx: 'fade',
			},
			{ text: 'buy them a drink', for: ['agu', 'ponsuke'] },
			{ text: 'climb out the bathroom window', for: ['hiyori'], fx: 'escape' },
			{
				text: 'squint at them like a leopard about to pounce',
				for: ['yochan'],
				fx: 'whisper',
			},
			{ text: 'crash their browser', for: ['damnseal'], fx: 'shake' },
			{
				text: 'schedule a meeting about it',
				for: ['snacksuke'],
				fx: 'corporate',
			},
		],
	},
	{
		text: 'pick a word',
		answers: [
			{ text: 'CEMENT', for: ['niko'], fx: 'cement' },
			{ text: 'WATERMELON', for: ['ponsuke'], fx: 'melon' },
			{ text: 'CHEERS', for: ['agu'], fx: 'tilt' },
			{ text: 'JAILBREAK', for: ['hiyori'], fx: 'stripes' },
			{ text: 'GYU', for: ['yochan'], fx: 'bounce' },
			{ text: '404', for: ['damnseal'], fx: 'glitch' },
			{ text: 'HONK', for: ['bobo'], fx: 'wobble' },
			{ text: 'SYNERGY', for: ['snacksuke'], fx: 'corporate' },
		],
	},
	{
		text: 'pick an ending',
		answers: [
			{ text: 'aged like mold', for: ['niko', 'bobo'], fx: 'mold' },
			{ text: 'he lived. he served. fly high', for: ['ponsuke'] },
			{ text: 'whereabouts unknown', for: ['agu', 'hiyori'], fx: 'blur' },
			{ text: 'escaped. again', for: ['hiyori'], fx: 'escape' },
			{
				text: 'became the sun, had the moon, got turned into a discord bot',
				for: ['yochan'],
				fx: 'sun',
			},
			{
				text: 'took the whole internet down with me',
				for: ['damnseal'],
				fx: 'fall',
			},
			{ text: 'full recovery', for: ['bobo'], fx: 'jump' },
			{ text: 'still alive since 1859', for: ['snacksuke'], fx: 'cite' },
		],
	},
];
