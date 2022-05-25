import { HTMLElement } from "node-html-parser";
import { AppSettings } from "./core/aggregate/AppSettings.js";
import { HtmlScraper } from "./core/aggregate/HtmlScraper.js";
import { Client } from "./infrastructure/Client.js";
import { FileSystemWrapper } from "./infrastructure/FileSystemWrapper.js";
import { HtmlParser } from "./infrastructure/HtmlParser.js";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { OutputFormatter } from "./infrastructure/OutputFormatter.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const fs = new FileSystemWrapper();
const pathToSettings: string = resolve(__dirname, "../app.settings.json");

// init all and run
((): void => {
	const settings = new AppSettings(pathToSettings, fs);
	const client = new Client();
	const scraper = new HtmlScraper(client, settings);
	const parser = new HtmlParser();
	const formatter = new OutputFormatter();

	settings.paths.forEach(async (path) => {
		try {
			const html: Promise<string> = scraper.ScrapeHtmlAsync(path);
			const document: HTMLElement = parser.LoadHtml(await html);
			// @ts-ignore
			const json: JSON = scraper.ScrapeSelectionItems(document);
			const serializedJson: string = formatter.SerializeJson(json);
			fs.WriteFile(settings.outputPath, serializedJson);
		} catch (e) {
			console.error(e);
		}
	});
})();
