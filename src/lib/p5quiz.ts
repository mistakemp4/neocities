import { questions, quizUrl, results } from '$/data/p5quiz';

const ids = results.map(result => result.id);

// mulberry32: small seeded random, so the answer order is the same on every build
function random(seed: number) {
	let a = seed;
	return () => {
		a = (a + 0x6d2b79f5) | 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

function shuffled<T>(items: T[], seed: number) {
	const out = [...items];
	const next = random(seed);
	for (let i = out.length - 1; i > 0; i--) {
		const j = Math.floor(next() * (i + 1));
		[out[i], out[j]] = [out[j], out[i]];
	}
	return out;
}

export const quiz = {
	questions: questions.map((question, index) => {
		const used = question.answers.flatMap(answer => answer.for);
		// a result missing from a question could never win fairly
		if ([...used].sort().join() !== [...ids].sort().join())
			throw new Error(
				`"${question.text}" must use every result exactly once, got ${used.join(', ')}`,
			);
		return {
			text: question.text,
			answers: shuffled(question.answers, index + 1),
		};
	}),
	results: results.map(result => {
		const badge = `/quiz/p5/${result.id}.png`;
		const alt = `i got ${result.name}! which persona 5 character are you?`;
		return {
			...result,
			badge,
			embed: `<a href="${quizUrl}"><img src="${result.hosted ?? new URL(badge, quizUrl).href}" alt="${alt}" width="300" height="120"></a>`,
		};
	}),
};
