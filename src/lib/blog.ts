import { getCollection } from 'astro:content';

export async function getSortedBlogPosts() {
	const posts = (await getCollection('blog')).toSorted(
		(a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
	);
	return posts;
}

export function formatDate(date: Date): string {
	const monthNumber = date.getMonth();
	const day = date.getDate();
	const year = date.getFullYear();

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const month = months[monthNumber];

	return `${month} ${day}, ${year}`;
}
