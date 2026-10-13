export const quizUrl = 'https://mistakemp4.neocities.org/library/p5-quiz/';

export interface Result {
	id: string;
	name: string;
	codename: string;
	arcana: string;
	color: string;
	blurb: string;
	// badge url on catbox.moe, so embeds don't hotlink this site
	hosted?: string;
}

export const results: Result[] = [
	{
		id: 'ren',
		name: 'Ren',
		codename: 'Joker',
		arcana: 'Fool',
		color: '#e60012',
		blurb:
			'quiet, hard to read, and somehow everyone you meet ends up trusting you with their whole life story. you say yes to way too many favors and still pull every single one off',
		hosted: 'https://files.catbox.moe/wv0jq3.png',
	},
	{
		id: 'morgana',
		name: 'Morgana',
		codename: 'Mona',
		arcana: 'Magician',
		color: '#4fb3e8',
		blurb:
			'proud, dramatic, and the self appointed leader of any room you walk into. you talk big because you are scared of being useless. loyal to the end, weak to fatty tuna, and you are NOT a cat',
		hosted: 'https://files.catbox.moe/kvdjke.png',
	},
	{
		id: 'ryuji',
		name: 'Ryuji',
		codename: 'Skull',
		arcana: 'Chariot',
		color: '#f5d400',
		blurb:
			'loud, zero filter, heart way bigger than your impulse control. you act first and think never, but nobody is more loyal than you. for real',
		hosted: 'https://files.catbox.moe/qrlua5.png',
	},
	{
		id: 'ann',
		name: 'Ann',
		codename: 'Panther',
		arcana: 'Lovers',
		color: '#ff4f8b',
		blurb:
			'people decide who you are before you open your mouth, and they are always wrong. warm, stubborn, bad at lying, and you would burn the world down for a friend',
		hosted: 'https://files.catbox.moe/b961ly.png',
	},
	{
		id: 'yusuke',
		name: 'Yusuke',
		codename: 'Fox',
		arcana: 'Emperor',
		color: '#3d6fe0',
		blurb:
			'you live in your own world and it is a beautiful one. social cues bounce right off you, your wallet is empty, and you would skip three meals for the perfect view',
		hosted: 'https://files.catbox.moe/5m2wah.png',
	},
	{
		id: 'makoto',
		name: 'Makoto',
		codename: 'Queen',
		arcana: 'Priestess',
		color: '#2fa39a',
		blurb:
			'the responsible one. you make the plan, you follow the rules, and you are so tired of being useful to everyone. scary when you finally snap',
		hosted: 'https://files.catbox.moe/ksuhi5.png',
	},
	{
		id: 'futaba',
		name: 'Futaba',
		codename: 'Oracle',
		arcana: 'Hermit',
		color: '#7ed321',
		blurb:
			'gremlin. genius online, a mess in a room full of strangers. once someone gets in your party though they get the full unfiltered you forever',
		hosted: 'https://files.catbox.moe/tm2xt2.png',
	},
	{
		id: 'haru',
		name: 'Haru',
		codename: 'Noir',
		arcana: 'Empress',
		color: '#c98bff',
		blurb:
			'soft voice, sweet smile, and a surprising amount of violence in there. you spent a long time being polite about your own life and you are done with that',
		hosted: 'https://files.catbox.moe/c1gwi9.png',
	},
	{
		id: 'akechi',
		name: 'Akechi',
		codename: 'Crow',
		arcana: 'Justice',
		color: '#c79a5b',
		blurb:
			'charming, clever, and nobody really knows you. you need to win, you need to be noticed, and you would rather die than admit you want a friend',
		hosted: 'https://files.catbox.moe/a4ytz4.png',
	},
	{
		id: 'kasumi',
		name: 'Kasumi',
		codename: 'Violet',
		arcana: 'Faith',
		color: '#e0445c',
		blurb:
			'graceful and cheerful and working so much harder than anyone can see. you hold yourself to an impossible standard and eat like three people',
		hosted: 'https://files.catbox.moe/275rba.png',
	},
];

export interface Question {
	text: string;
	// an answer can count for one result or a few; every result shows up once per question
	answers: { text: string; for: string[] }[];
}

export const questions: Question[] = [
	{
		text: 'its a free afternoon. what are you doing',
		answers: [
			{ text: 'going for a run or hitting the gym', for: ['ryuji', 'kasumi'] },
			{
				text: 'trying that new cafe everyone is posting about',
				for: ['ann', 'akechi'],
			},
			{
				text: 'staying in and tinkering with something until 3am',
				for: ['futaba', 'ren'],
			},
			{
				text: 'a museum, a garden, anywhere pretty and quiet',
				for: ['yusuke', 'haru'],
			},
			{
				text: 'getting ahead on work so i can relax later (i wont)',
				for: ['makoto'],
			},
			{
				text: 'a nap somewhere sunny, then wandering around until something catches my eye',
				for: ['morgana'],
			},
		],
	},
	{
		text: 'someone with power is screwing over your friend. you:',
		answers: [
			{ text: 'lose it and confront them on the spot', for: ['ryuji', 'ann'] },
			{
				text: 'quietly collect evidence and build a case',
				for: ['makoto', 'akechi'],
			},
			{
				text: 'handle it my own way. it will be weird but it will work',
				for: ['futaba', 'yusuke'],
			},
			{
				text: 'stay with my friend first, revenge can wait',
				for: ['haru', 'kasumi'],
			},
			{
				text: 'come up with a plan and get everyone in on it',
				for: ['ren', 'morgana'],
			},
		],
	},
	{
		text: 'pick a word',
		answers: [
			{ text: 'REBELLION', for: ['ren', 'ryuji'] },
			{ text: 'BEAUTY', for: ['yusuke', 'ann'] },
			{ text: 'JUSTICE', for: ['akechi', 'makoto'] },
			{ text: 'GRACE', for: ['haru', 'kasumi'] },
			{ text: 'CURIOSITY', for: ['futaba'] },
			{ text: 'PRIDE', for: ['morgana'] },
		],
	},
	{
		text: 'your role in the friend group',
		answers: [
			{ text: 'the hype one. loud, zero filter', for: ['ryuji', 'ann'] },
			{
				text: 'the mom friend. did everyone eat? go to sleep',
				for: ['makoto', 'morgana'],
			},
			{
				text: 'the quiet one everybody ends up trusting',
				for: ['ren', 'haru'],
			},
			{
				text: 'everyone likes me, nobody really knows me',
				for: ['akechi', 'kasumi'],
			},
			{ text: 'the weird one (lovingly)', for: ['yusuke', 'futaba'] },
		],
	},
	{
		text: 'pick something to eat',
		answers: [
			{ text: 'a huge bowl of ramen, extra meat', for: ['ryuji', 'kasumi'] },
			{ text: 'crepes, pancakes, anything sweet', for: ['ann', 'akechi'] },
			{
				text: 'fancy sushi (someone else is paying)',
				for: ['morgana', 'yusuke'],
			},
			{ text: 'curry and a good cup of coffee', for: ['ren', 'haru'] },
			{
				text: 'whatever is fastest, i have stuff to do',
				for: ['futaba', 'makoto'],
			},
		],
	},
	{
		text: 'how do you deal with stress',
		answers: [
			{ text: 'work out until i cant think', for: ['ryuji', 'makoto'] },
			{
				text: 'practice harder. if im perfect it wont hurt',
				for: ['kasumi', 'akechi'],
			},
			{
				text: 'vanish into a hobby and forget to eat',
				for: ['futaba', 'yusuke'],
			},
			{ text: 'complain to a friend over something sweet', for: ['ann'] },
			{ text: 'storm off and hope someone comes after me', for: ['morgana'] },
			{ text: 'act fine. nobody needs to know', for: ['ren', 'haru'] },
		],
	},
	{
		text: 'be honest, whats your worst trait',
		answers: [
			{ text: 'i act before i think', for: ['ryuji'] },
			{
				text: 'my pride. i have to be the best at something',
				for: ['morgana', 'akechi'],
			},
			{
				text: 'i overthink and follow the rules too much',
				for: ['makoto', 'kasumi'],
			},
			{ text: 'i hide what im actually feeling', for: ['haru'] },
			{
				text: 'im in my own world. social cues who',
				for: ['yusuke', 'futaba'],
			},
			{ text: 'i cant say no to people', for: ['ann', 'ren'] },
		],
	},
	{
		text: 'where are we hanging out',
		answers: [
			{ text: 'the arcade, then food', for: ['ryuji', 'makoto'] },
			{ text: 'shopping in harajuku', for: ['ann', 'kasumi'] },
			{
				text: 'a jazz club, somewhere quiet and grown up',
				for: ['akechi', 'ren'],
			},
			{ text: 'an art museum or a rooftop garden', for: ['yusuke', 'haru'] },
			{ text: 'akihabara. or just my room honestly', for: ['futaba'] },
			{
				text: 'i dont care where, as long as i get to come along',
				for: ['morgana'],
			},
		],
	},
	{
		text: 'what would make you fight',
		answers: [
			{ text: 'someone getting hurt who cant fight back', for: ['ren', 'ann'] },
			{ text: 'proving that im worth something', for: ['akechi', 'morgana'] },
			{
				text: 'my friends are fighting and im not leaving them',
				for: ['ryuji', 'futaba'],
			},
			{
				text: 'getting to choose my own life for once',
				for: ['haru', 'makoto'],
			},
			{ text: 'figuring out who i really am', for: ['kasumi', 'yusuke'] },
		],
	},
	{
		text: 'someone confesses to you behind the school. you:',
		answers: [
			{
				text: 'play it cool while screaming on the inside',
				for: ['ren', 'makoto'],
			},
			{ text: 'go bright red. HUH?! FOR REAL?!', for: ['ryuji', 'futaba'] },
			{
				text: 'get flustered but manage to say something sweet',
				for: ['haru', 'kasumi'],
			},
			{
				text: 'smile politely and wonder what they actually want',
				for: ['akechi', 'ann'],
			},
			{
				text: 'miss the point completely and change the subject',
				for: ['yusuke'],
			},
			{
				text: 'of course they like me, im a catch... wait, me??',
				for: ['morgana'],
			},
		],
	},
	{
		text: 'describe your room',
		answers: [
			{ text: 'messy. clothes and manga everywhere', for: ['ryuji'] },
			{ text: 'cute stuff, magazines and a hidden snack drawer', for: ['ann'] },
			{
				text: 'half finished projects everywhere and nothing in the fridge',
				for: ['futaba', 'yusuke'],
			},
			{ text: 'spotless. everything has a place', for: ['makoto', 'akechi'] },
			{ text: 'elegant and full of plants', for: ['haru'] },
			{ text: 'trophies and a strict schedule on the wall', for: ['kasumi'] },
			{
				text: 'kind of bare. i can sleep anywhere honestly',
				for: ['ren', 'morgana'],
			},
		],
	},
	{
		text: 'what do people get wrong about you',
		answers: [
			{ text: 'they think im trouble. im really not', for: ['ren', 'ryuji'] },
			{
				text: 'they see how i look and make up the rest',
				for: ['ann', 'morgana'],
			},
			{ text: 'they think im being weird on purpose', for: ['yusuke'] },
			{
				text: 'they think im cold. im just bad with people',
				for: ['makoto', 'futaba'],
			},
			{ text: 'they think im helpless', for: ['haru'] },
			{ text: 'they think it all comes easy to me', for: ['akechi', 'kasumi'] },
		],
	},
];
