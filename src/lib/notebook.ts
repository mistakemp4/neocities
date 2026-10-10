// Reads a notebook exported by export_site.py (it lives in the notebook's own repo).
// The json stores every block of text as a list of lines, which keeps the file
// readable and its diffs small. This turns it back into plain strings.

export type Output =
	| { kind: 'text'; text: string }
	| { kind: 'html'; html: string }
	| { kind: 'image'; src: string; width: number; height: number };

export type Cell =
	| { type: 'markdown'; html: string }
	| { type: 'code'; source: string; outputs: Output[] };

export interface Section {
	id: string;
	text: string;
}

type RawOutput =
	| { kind: 'text'; text: string[] }
	| { kind: 'html'; html: string[] }
	| { kind: 'image'; src: string; width: number; height: number };

type RawCell =
	| { type: 'markdown'; html: string[] }
	| { type: 'code'; source: string[]; outputs: RawOutput[] };

function join(lines: string[]) {
	return lines.join('\n');
}

function joinOutput(out: RawOutput): Output {
	if (out.kind === 'text') return { kind: 'text', text: join(out.text) };
	if (out.kind === 'html') return { kind: 'html', html: join(out.html) };
	return out;
}

// "Spawn rates by type" -> "spawn-rates-by-type"
function slug(heading: string) {
	return heading
		.toLowerCase()
		.replace(/&[^;]+;/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

export function readNotebook(raw: unknown) {
	const cells: Cell[] = [];
	const sections: Section[] = [];
	let title = 'The notebook';

	for (const cell of raw as RawCell[]) {
		if (cell.type === 'code') {
			cells.push({
				type: 'code',
				source: join(cell.source),
				outputs: cell.outputs.map(joinOutput),
			});
			continue;
		}

		let html = join(cell.html);

		// the notebook's own h1 is handed back as the title instead of being shown twice
		const h1 = html.match(/<h1>(.*?)<\/h1>\n?/);
		if (h1) {
			title = h1[1];
			html = html.replace(h1[0], '');
		}

		// every h2 starts a section and gets an id, so a legend can link to it
		const h2 = html.match(/^<h2>(.*?)<\/h2>/);
		if (h2) {
			const id = slug(h2[1]);
			sections.push({ id, text: h2[1] });
			html = html.replace('<h2>', `<h2 id="${id}" data-section>`);
		}

		cells.push({ type: 'markdown', html });
	}

	return { title, cells, sections };
}
