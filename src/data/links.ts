export interface OutLink {
	href: string;
	name: string;
	note: string;
}

// sites without a button
export const coolSites: OutLink[] = [
	{
		href: 'https://homieshouse.itch.io/',
		name: 'homie',
		note: 'homie, or homieshouse, is a game developer that makes games on itch.io. they are noted for clinical trial',
	},
	{
		href: 'https://andou.gay/',
		name: 'andou.gay',
		note: 'home of the donut quiz',
	},
	{
		href: 'https://clownfred.zone/',
		name: 'clownfred.zone',
		note: 'home of the clown quiz',
	},
	{
		href: 'https://mayonakapromise.neocities.org/',
		name: 'mayonakapromise',
		note: 'hair color & dere type quizzes',
	},
	{
		href: 'https://swiftyshq.neocities.org/',
		name: "swifty's hq",
		note: 'home of the eevee quiz',
	},
	{
		href: 'https://www.marheavenj.net/akechi/index.php',
		name: 'A JUSTICE made of Lies and Hate',
		note: 'the akechi goro fanlisting',
	},
];

// single pages i liked
export const coolPages: OutLink[] = [
	{
		href: 'https://camp2.rectangle.zone/wiki/List_of_minor_seals',
		name: 'List of minor seals',
		note: 'every seal not notable enough to get its own page',
	},
	{
		href: 'https://camp2.rectangle.zone/wiki/Yo-chan',
		name: 'Yo-chan',
		note: 'a ringed seal of disastrous appearance & odd demeanour. best girl. my bot is named after her',
	},
	{
		href: 'https://homieshouse.itch.io/clinical-trial',
		name: 'Clinical Trial',
		note: 'the game i wrote a whole blog post about',
	},
];

// same as the resources on the about page
export const resources: OutLink[] = [
	{
		href: 'https://solaria.neocities.org/guides/',
		name: "Solaria's Web Design Guides",
		note: 'guides for beginners learning web design',
	},
	{
		href: 'https://sadgrl.online/resources/',
		name: 'sadgrl.online Free Layouts',
		note: 'free layouts & resources, my theme started from one',
	},
	{
		href: 'https://www.w3schools.com/',
		name: 'W3Schools',
		note: 'tutorials & references for html, css & javascript',
	},
];
