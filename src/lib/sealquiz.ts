import { questions, quizUrl, results } from '$/data/sealquiz';
import { random, shuffled } from '$/lib/shuffle';

const ids = results.map(result => result.id);
const counts = new Map<string, number>();

// combining marks stacked on every letter. seeded, so builds match
function zalgo(text: string) {
	const next = random(1859);
	return [...text]
		.map(char => {
			if (char === ' ') return char;
			const marks = 6 + Math.floor(next() * 10);
			let out = char;
			for (let i = 0; i < marks; i++)
				out += String.fromCodePoint(0x300 + Math.floor(next() * 0x70));
			return out;
		})
		.join('');
}

export const quiz = {
	questions: questions.map((question, index) => {
		const used = new Set(question.answers.flatMap(answer => answer.for));
		for (const id of used)
			if (!ids.includes(id))
				throw new Error(`"${question.text}" names an unknown seal: ${id}`);
		// every seal needs a way to score on every question
		const missing = ids.filter(id => !used.has(id));
		if (missing.length)
			throw new Error(
				`"${question.text}" never counts for ${missing.join(', ')}`,
			);
		for (const answer of question.answers)
			for (const id of answer.for) counts.set(id, (counts.get(id) ?? 0) + 1);
		return {
			text: question.text,
			answers: shuffled(question.answers, index + 1).map(answer => ({
				...answer,
				glitched: answer.fx === 'zalgo' ? zalgo(answer.text) : undefined,
			})),
		};
	}),
	results: results.map(result => {
		const badge = `/quiz/seal/${result.id}.png`;
		const alt = `i got ${result.name}! which seal are you?`;
		return {
			...result,
			badge,
			embed: `<a href="${quizUrl}"><img src="${new URL(badge, quizUrl).href}" alt="${alt}" width="200" height="280"></a>`,
		};
	}),
};

// the same total for every seal, so none is easier to get
if (new Set(counts.values()).size !== 1)
	throw new Error(
		`seals show up unevenly: ${JSON.stringify(Object.fromEntries(counts))}`,
	);
