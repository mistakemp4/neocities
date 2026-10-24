// alpine state for a page's contents legend: lights up the entry for the section being read.
// sections are elements with data-section and an id
export function legendState(first: string) {
	return `{
	current: '${first}',
	locked: false,
	timer: null,

	// a section is current once its heading has passed this line
	line() {
		const reading = innerHeight * 0.3;
		// the last few headings can never scroll up that far, so for the final stretch
		// the line slides down and reaches the bottom of the screen at the end of the page
		const left = document.documentElement.scrollHeight - innerHeight - scrollY;
		return Math.max(reading, innerHeight - left);
	},

	track() {
		if (this.locked) return;
		const line = this.line();
		let found = '${first}';
		for (const el of document.querySelectorAll('[data-section]')) {
			if (el.getBoundingClientRect().top <= line) found = el.id;
		}
		this.light(found);
	},

	// a clicked entry stays lit, even when its section is too short to reach the line
	jump(id) {
		this.light(id);
		this.locked = true;
		clearTimeout(this.timer);
		this.timer = setTimeout(() => (this.locked = false), 500);
	},

	light(id) {
		if (id === this.current) return;
		this.current = id;
		// keep the lit entry in view when the legend itself has to scroll.
		// not scrollIntoView: that scrolls the page too, and on phones it pulled it back up to the legend
		this.$nextTick(() => {
			const aside = this.$root.querySelector('aside');
			const link = aside?.querySelector('a.here');
			if (!link) return;
			const box = aside.getBoundingClientRect();
			const at = link.getBoundingClientRect();
			if (at.top < box.top) aside.scrollTop -= box.top - at.top;
			else if (at.bottom > box.bottom) aside.scrollTop += at.bottom - box.bottom;
		});
	},
}`;
}
