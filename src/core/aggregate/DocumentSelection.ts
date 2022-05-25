export class DocumentSelection {
	name: string;
	content: Selector;
	type: string;

	constructor(name: string, content: Selector, type: string) {
		this.name = name;
		this.content = content;
		this.type = type;
	}
}

interface Selector {
	// TODO: swap to string[]
	selector: string;
	excludes: string[];
}
