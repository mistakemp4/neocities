import type { ImageMetadata } from 'astro';

import akechi from '$/assets/akechi.webp';
import chidori from '$/assets/chidori.webp';
import chie from '$/assets/chie.webp';
import edward from '$/assets/edward.webp';
import ein from '$/assets/ein.webp';
import futaba from '$/assets/futaba.webp';
import haru from '$/assets/haru.webp';
import haruhi from '$/assets/haruhi.webp';
import kaidou from '$/assets/kaidou.webp';
import kanna from '$/assets/kanna.webp';
import kobayashi from '$/assets/kobayashi.webp';
import l from '$/assets/L.webp';
import light from '$/assets/light.webp';
import makoto from '$/assets/makoto.webp';
import mami from '$/assets/mami.webp';
import megumin from '$/assets/megumin.webp';
import nagatoro from '$/assets/nagatoro.webp';
import naoto from '$/assets/naoto.webp';
import ren from '$/assets/ren.webp';
import ryuji from '$/assets/ryuji.webp';
import shinji from '$/assets/shinji.webp';
import tamaki from '$/assets/tamaki.webp';
import tohru from '$/assets/tohru.webp';
import yosuke from '$/assets/yosuke.webp';
import yu from '$/assets/Yu.webp';
import yukari from '$/assets/yukari.webp';
import yusuke from '$/assets/yusuke.webp';

export interface Character {
	name: string;
	series: string;
	image: ImageMetadata;
	tier: string;
}

// array order = order within each tier
export const characters: Character[] = [
	{ name: 'Goro Akechi', series: 'Persona 5', image: akechi, tier: 'S' },
	{ name: 'Sakura Futaba', series: 'Persona 5', image: futaba, tier: 'S' },
	{ name: 'Hanamura Yosuke', series: 'Persona 4', image: yosuke, tier: 'S' },
	{
		name: 'Ikari Shinji',
		series: 'Neon Genesis Evangelion',
		image: shinji,
		tier: 'S',
	},

	{ name: 'Amamiya Ren', series: 'Persona 5', image: ren, tier: 'A' },
	{
		name: 'Suoh Tamaki',
		series: 'Ouran High School Host Club',
		image: tamaki,
		tier: 'A',
	},
	{ name: 'Narukami Yu', series: 'Persona 4', image: yu, tier: 'A' },
	{ name: 'Kitagawa Yusuke', series: 'Persona 5', image: yusuke, tier: 'A' },
	{ name: 'Shirogane Naoto', series: 'Persona 4', image: naoto, tier: 'A' },
	{ name: 'Nagatoro Hayase', series: 'Misc', image: nagatoro, tier: 'A' },

	{ name: 'Tomoe Mami', series: 'Misc', image: mami, tier: 'B' },
	{ name: 'Okumura Haru', series: 'Persona 5', image: haru, tier: 'B' },
	{ name: 'Sakamoto Ryuji', series: 'Persona 5', image: ryuji, tier: 'B' },
	{ name: 'Yoshino Chidori', series: 'Persona 3', image: chidori, tier: 'B' },
	{ name: 'Takeba Yukari', series: 'Persona 3', image: yukari, tier: 'B' },
	{ name: 'Satonaka Chie', series: 'Persona 4', image: chie, tier: 'B' },
	{
		name: 'Fujioka Haruhi',
		series: 'Ouran High School Host Club',
		image: haruhi,
		tier: 'B',
	},
	{ name: 'L Lawliet', series: 'Death Note', image: l, tier: 'B' },
	{ name: 'Yuki Makoto', series: 'Persona 3', image: makoto, tier: 'B' },

	{
		name: 'Kamui Kanna',
		series: "Miss Kobayashi's Dragon Maid",
		image: kanna,
		tier: 'C',
	},
	{
		name: 'Kobayashi',
		series: "Miss Kobayashi's Dragon Maid",
		image: kobayashi,
		tier: 'C',
	},
	{
		name: 'Tohru',
		series: "Miss Kobayashi's Dragon Maid",
		image: tohru,
		tier: 'C',
	},
	{ name: 'Edward', series: 'Cowboy Bebop', image: edward, tier: 'C' },
	{ name: 'Ein', series: 'Cowboy Bebop', image: ein, tier: 'C' },
	{ name: 'Kaidou Shun', series: 'Misc', image: kaidou, tier: 'C' },
	{ name: 'Megumin', series: 'Misc', image: megumin, tier: 'C' },
	{ name: 'Yagami Light', series: 'Death Note', image: light, tier: 'C' },
];

export const tiers = [
	{ id: 'S', label: 'literally me', color: '#7a2b2b' },
	{ id: 'A', label: 'I WANT THEM...', color: '#7a5a2b' },
	{ id: 'B', label: 'love them', color: '#5a6a2b' },
	{ id: 'C', label: 'really like', color: '#2b5a6a' },
];

export function groupBy<T>(items: T[], key: (item: T) => string) {
	const groups = new Map<string, T[]>();
	for (const item of items) {
		const k = key(item);
		groups.set(k, [...(groups.get(k) ?? []), item]);
	}
	return groups;
}
