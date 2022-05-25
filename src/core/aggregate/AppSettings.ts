import { cursorTo } from "readline";
import { IFileSystemWrapper } from "../interfaces/IFileSystemWrapper.js";
import { DocumentSelection } from "./DocumentSelection.js";

export class AppSettings {
	#settings: string;

	basePath: string;
	paths: string[];
	scrapeBasePath: boolean;

	outputPath: string;
	outputFormat: string;

	parentSelector: string;
	selections: DocumentSelection[];

	keepExcludes: boolean;
	excludedRemapping: DocumentSelection[];

	constructor(path: string, fs: IFileSystemWrapper) {
		this.#settings = fs.ReadFile(path);
		this.#AssignSettingsFromJson();
		this.#GeneratePaths();
		this.#ConfirmUrls(this.paths);
		if (this.scrapeBasePath) this.paths.push(this.basePath);
		if (this.keepExcludes)
			this.selections = this.excludedRemapping.concat(this.selections);

	}

	#AssignSettingsFromJson = (): void => {
		const json: JSON = JSON.parse(this.#settings);
		Object.assign(this, json);
	};

	// customize this if paths not in app.settings.json
	#GeneratePaths = (): void => {
		if (this.paths.length) return;
		for (let i: number = 2; i <= 48; i++) {
			this.paths.push(`${this.basePath}page/${i}`);
		}
	};

	#ConfirmUrls = (urls: string[]): void => {
		try {
			urls.forEach((url) => new URL(url));
		} catch (e) {
			console.error(`[AppSettings] - Error parsing paths.`);
			throw e;
		}
	};
}
