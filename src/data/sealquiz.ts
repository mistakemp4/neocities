import results from './sealquiz-results.json';

export { results };

export const quizUrl = 'https://mistakemp4.neocities.org/library/seal-quiz/';
export const wiki = 'https://camp2.rectangle.zone/wiki/';

export type SealId = (typeof results)[number]['id'];

export interface Answer {
	text: string;
	// one answer can count for more than one seal
	for: SealId[];
}

export interface Question {
	text: string;
	answers: Answer[];
}

export const questions: Question[] = [
	{
		text: 'it is 4am. you:',
		answers: [
			{ text: 'stare at the wall. smelling bad', for: ['niko'] },
			{
				text: 'stick your tongue out at nobody in particular',
				for: ['ponsuke'],
			},
			{ text: 'crack open a cold one', for: ['agu'] },
			{ text: 'break out of the aquarium', for: ['hiyori'] },
			{ text: 'jump. just jump', for: ['yochan'] },
			{ text: 'crash your own computer. on purpose', for: ['damnseal'] },
			{ text: 'blow up a balloon. you cannot tie it', for: ['bobo'] },
			{ text: 'invent a new snack', for: ['snacksuke'] },
		],
	},
	{
		text: 'pick something to eat',
		answers: [
			{ text: 'cement', for: ['niko'] },
			{ text: 'watermelon', for: ['ponsuke'] },
			{ text: 'beer (it counts)', for: ['agu'] },
			{ text: "agu's beer", for: ['hiyori'] },
			{
				text: 'fish. and if it is late everyone will hear about it',
				for: ['yochan'],
			},
			{ text: 'your ram', for: ['damnseal'] },
			{ text: 'one peanut. you will throw up a little', for: ['bobo'] },
			{ text: "a snack you invented (it's bad)", for: ['snacksuke'] },
		],
	},
	{
		text: 'your d&d character is',
		answers: [
			{ text: 'a warlock who made a pact with cement', for: ['niko'] },
			{
				text: 'the cleric. someone has to heal these people',
				for: ['ponsuke'],
			},
			{ text: 'a bard who only plays drinking songs', for: ['agu'] },
			{ text: 'a rogue (obviously)', for: ['hiyori'] },
			{ text: 'a barbarian. jump first, ask later', for: ['yochan'] },
			{
				text: 'a wild magic sorcerer who keeps exploding the party',
				for: ['damnseal'],
			},
			{ text: 'the npc everyone keeps killing', for: ['bobo'] },
			{
				text: 'an artificer selling potions to the party at a markup',
				for: ['snacksuke'],
			},
		],
	},
	{
		text: 'your house is',
		answers: [
			{ text: 'a pile of gravel', for: ['niko'] },
			{ text: 'cozy & full of plushies', for: ['ponsuke'] },
			{ text: 'always throwing a party', for: ['agu'] },
			{ text: "someone else's", for: ['hiyori'] },
			{ text: 'one big round bed', for: ['yochan'] },
			{ text: 'a server room on fire', for: ['damnseal'] },
			{ text: 'a clown car', for: ['bobo'] },
			{
				text: 'a mansion with a vending machine in every room',
				for: ['snacksuke'],
			},
		],
	},
	{
		text: 'your friends describe you as',
		answers: [
			{ text: 'just...so... UGLY !! please leave', for: ['niko'] },
			{ text: 'the one everyone misses', for: ['ponsuke'] },
			{ text: 'a bad influence', for: ['agu'] },
			{
				text: 'someone they keep mixing up with someone else',
				for: ['hiyori'],
			},
			{ text: 'a disaster, but an excellent jumper', for: ['yochan'] },
			{ text: 'a visual-technological nightmare', for: ['damnseal'] },
			{
				text: 'nobody describes me. everybody fucking hates me',
				for: ['bobo'],
			},
			{ text: 'rich', for: ['snacksuke'] },
		],
	},
	{
		text: 'a stranger says hi. you say:',
		answers: [
			{ text: 'oh.. hi... please leave', for: ['niko'] },
			{ text: 'hiii!! :D', for: ['ponsuke'] },
			{ text: 'cheers', for: ['agu'] },
			{ text: 'nice bag. can i hold it', for: ['hiyori'] },
			{ text: 'gyu', for: ['yochan'] },
			{ text: 'ARE YOU SURE YOU WANT TO CONTINUE?', for: ['damnseal'] },
			{ text: 'honk honk </3', for: ['bobo'] },
			{ text: 'would you like a free sample', for: ['snacksuke'] },
		],
	},
	{
		text: 'pick a word',
		answers: [
			{ text: 'CEMENT', for: ['niko'] },
			{ text: 'WATERMELON', for: ['ponsuke'] },
			{ text: 'BEER', for: ['agu'] },
			{ text: 'JAILBREAK', for: ['hiyori'] },
			{ text: 'GYU', for: ['yochan'] },
			{ text: 'SCREENSHAKE', for: ['damnseal'] },
			{ text: 'PEANUT', for: ['bobo'] },
			{ text: 'PROFIT', for: ['snacksuke'] },
		],
	},
	{
		text: 'someone is mad at you. you:',
		answers: [
			{ text: 'commit tax evasion about it', for: ['niko'] },
			{ text: 'smile until it goes away', for: ['ponsuke'] },
			{ text: 'drink about it', for: ['agu'] },
			{ text: 'break out', for: ['hiyori'] },
			{
				text: 'squint at them like a leopard about to pounce',
				for: ['yochan'],
			},
			{ text: 'shake the whole page until they leave', for: ['damnseal'] },
			{ text: 'trip, fall over, get back up', for: ['bobo'] },
			{ text: 'offer them a coupon', for: ['snacksuke'] },
		],
	},
	{
		text: 'pick an ending',
		answers: [
			{ text: 'aged like mold', for: ['niko'] },
			{ text: 'loved by everyone, forever', for: ['ponsuke'] },
			{ text: 'whereabouts unknown', for: ['agu'] },
			{ text: 'drank the beer & left', for: ['hiyori'] },
			{ text: 'became the sun', for: ['yochan'] },
			{ text: 'the internet crashed', for: ['damnseal'] },
			{ text: 'full recovery', for: ['bobo'] },
			{ text: 'still alive since 1859', for: ['snacksuke'] },
		],
	},
];
