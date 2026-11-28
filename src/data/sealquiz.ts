import results from './sealquiz-results.json';

export { results };

export const quizUrl = 'https://mistakemp4.neocities.org/library/seal-quiz/';

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
		text: 'someone says good morning to you',
		answers: [
			{ text: "pretend you didn't hear it", for: ['yochan'] },
			{ text: 'say it back louder. GOOOOO', for: ['tsuki'] },
			{ text: 'agree. good morning. yes. absolutely', for: ['katsunori'] },
			{ text: 'say it back politely & show them a trick', for: ['hiyori'] },
			{
				text: 'already did the trick before they finished talking',
				for: ['agu'],
			},
			{ text: 'grunt & roll over', for: ['ponsuke'] },
			{ text: 'look at them like they ruined your life', for: ['niko'] },
			{ text: 'your screen starts shaking', for: ['damnseal'] },
		],
	},
	{
		text: 'someone hands you a costume to wear',
		answers: [
			{ text: 'slap it away', for: ['yochan'] },
			{ text: 'make so much noise they take it off', for: ['tsuki'] },
			{ text: 'wear it & be furious the entire time', for: ['katsunori'] },
			{ text: 'put it on right away. take pictures', for: ['hiyori'] },
			{ text: "wear it with dignity. you've worn worse", for: ['agu'] },
			{ text: 'stick your tongue out for the photo', for: ['ponsuke'] },
			{ text: 'cry until they take it off', for: ['niko'] },
			{ text: 'the costume is flashing now', for: ['damnseal'] },
		],
	},
	{
		text: "it's bath time",
		answers: [
			{ text: 'snort at whoever is holding the hose', for: ['yochan'] },
			{ text: 'complain loudly the whole time', for: ['tsuki'] },
			{ text: 'throw a fit. every single time', for: ['katsunori'] },
			{ text: 'do a little trick so it goes faster', for: ['hiyori'] },
			{ text: 'already in position before they turn it on', for: ['agu'] },
			{ text: 'love it. drink some of the water', for: ['ponsuke'] },
			{ text: 'sit there looking betrayed', for: ['niko'] },
			{ text: 'water + electronics', for: ['damnseal'] },
		],
	},
	{
		text: 'your crush walks by',
		answers: [
			{ text: "act like you don't care", for: ['yochan'] },
			{ text: 'yell so they notice you', for: ['tsuki'] },
			{ text: 'follow them around. every day. for years', for: ['katsunori'] },
			{ text: "they're already next to you. they always are", for: ['hiyori'] },
			{ text: 'growl at them. it has never worked', for: ['agu'] },
			{ text: "just smile. that's enough", for: ['ponsuke'] },
			{ text: 'get in the middle of them & their date', for: ['niko'] },
			{ text: 'send them a cursed image', for: ['damnseal'] },
		],
	},
	{
		text: 'your boss starts explaining something',
		answers: [
			{ text: 'do it, but with attitude', for: ['yochan'] },
			{ text: 'make noise in the background the whole time', for: ['tsuki'] },
			{ text: 'listen patiently with a very serious face', for: ['katsunori'] },
			{ text: 'try really hard, get lost halfway', for: ['hiyori'] },
			{ text: 'already done before they finish', for: ['agu'] },
			{ text: 'only if the reward is good enough', for: ['ponsuke'] },
			{ text: "wail. you don't want to", for: ['niko'] },
			{ text: 'crash the projector', for: ['damnseal'] },
		],
	},
	{
		text: 'you have a free afternoon',
		answers: [
			{ text: 'lie in the sun & do not get touched', for: ['yochan'] },
			{ text: 'bother whoever is napping', for: ['tsuki'] },
			{ text: 'hang out with the family', for: ['katsunori'] },
			{ text: 'zoom laps. nobody can catch you', for: ['hiyori'] },
			{ text: 'do some sit-ups', for: ['agu'] },
			{ text: 'big meal, then a nap', for: ['ponsuke'] },
			{ text: 'play soccer', for: ['niko'] },
			{ text: 'open 40 tabs', for: ['damnseal'] },
		],
	},
	{
		text: 'someone takes your picture',
		answers: [
			{ text: 'squish your neck in. gyu', for: ['yochan'] },
			{ text: 'be in the background of it, yelling', for: ['tsuki'] },
			{ text: 'scrunch your whole face up', for: ['katsunori'] },
			{ text: 'smile on cue. "nii"', for: ['hiyori'] },
			{ text: 'strike the airplane pose', for: ['agu'] },
			{ text: 'tongue out', for: ['ponsuke'] },
			{ text: 'look miserable. it goes viral', for: ['niko'] },
			{ text: 'the photo is cursed now', for: ['damnseal'] },
		],
	},
	{
		text: "someone gives you food you don't like",
		answers: [
			{ text: 'slap the table', for: ['yochan'] },
			{ text: 'whine until they bring something else', for: ['tsuki'] },
			{ text: "just eat it. complaining isn't worth it", for: ['katsunori'] },
			{ text: 'go eat some snow', for: ['hiyori'] },
			{ text: 'eat it, then beg for more anyway', for: ['agu'] },
			{ text: "eat around it. you're picky", for: ['ponsuke'] },
			{ text: 'eat cement instead', for: ['niko'] },
			{ text: 'the food is 404 now', for: ['damnseal'] },
		],
	},
	{
		text: 'someone keeps poking you',
		answers: [
			{ text: 'slap your own belly at them', for: ['yochan'] },
			{ text: "poke them back. it's a game now", for: ['tsuki'] },
			{ text: 'throw a tantrum', for: ['katsunori'] },
			{ text: 'offer them a handshake', for: ['hiyori'] },
			{ text: "let them. you're used to it", for: ['agu'] },
			{ text: 'give them the side eye', for: ['ponsuke'] },
			{ text: 'paw at them until they stop', for: ['niko'] },
			{ text: 'they get an error message', for: ['damnseal'] },
		],
	},
	{
		text: 'pick an ending',
		answers: [
			{
				text: 'the idol, with a kid who looks exactly like you',
				for: ['yochan'],
			},
			{ text: 'the loudest one in the building, forever', for: ['tsuki'] },
			{ text: 'got the girl after years of trying', for: ['katsunori'] },
			{
				text: 'super ultimate galaxy princess, with your girlfriend',
				for: ['hiyori'],
			},
			{ text: 'old & still the best one there', for: ['agu'] },
			{ text: 'famous forever for one silly moment', for: ['ponsuke'] },
			{ text: 'grew up & got handsome', for: ['niko'] },
			{ text: 'THIS SEAL WILL DIE', for: ['damnseal'] },
		],
	},
];
