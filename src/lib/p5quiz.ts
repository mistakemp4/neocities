import { questions, quizUrl, results } from '$/data/p5quiz';
import { shuffled } from '$/lib/shuffle';

const ids = results.map(result => result.id);

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
