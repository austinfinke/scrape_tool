import { IClient } from "../interfaces/IClient.js";
import { HtmlElement } from "../interfaces/IHtmlParser.js";
import { AppSettings } from "./AppSettings.js";
import { DocumentSelection } from "./DocumentSelection.js";

export class HtmlScraper {
	#settings: AppSettings;
	#client: IClient;
	#dataContainer: { scrape: string; items: object[] } = { scrape: "acehandyman", items: [] };

	constructor(client: IClient, settings: AppSettings) {
		this.#client = client;
		this.#settings = settings;
	}

	ScrapeHtmlAsync = async (url: string): Promise<string> => this.#client.Get(url);

	ScrapeSelectionItems = (document: HtmlElement): { scrape: string; items: object[] } => {
		const parentElements: HtmlElement[] = Array.from(
			document.querySelectorAll(this.#settings.parentSelector)
		);

		if (parentElements.length) this.#HandleMultipleElements(parentElements);

		return this.#dataContainer;
	};

	#HandleMultipleElements = (elements: HtmlElement[]): void =>
		elements.forEach((element) => this.#HandleSingleElement(element));

	#HandleSingleElement(element: HtmlElement): void {
		const scraped: object = {};
		this.#settings.selections.forEach((appSetting) => {
			const {
				content: { selector, excludes },
			} = appSetting;

			const data: HtmlElement | null = element?.querySelector(selector);

			if (this.#HasExcludes(appSetting)) this.#RemoveExcludedContent(element, excludes);

			if (data)
				this.#AssignToObject(
					scraped,
					appSetting.name,
					this.#GetDataByType(data, appSetting)
				);

			// @ts-ignore
			if (!data && !scraped[appSetting.name]) scraped[appSetting.name] = "";
		});

		this.#dataContainer.items.push(scraped);
	}

	#GetDataByType = (
		data: HtmlElement | null,
		setting: DocumentSelection
	): string | undefined | null => {
		if (!data) return null;

		const type = setting.type;

		let dataByType: string | undefined | null = null;

		if (type === "string")
			// @ts-ignore
			dataByType = data.rawText;
		else if (type === "html") dataByType = encodeURI(data.innerHTML);
		// attribute is passed in attribute:<attributename> format
		else if (type.includes("attribute:")) dataByType = data.getAttribute(type.slice(10));

		if (setting.name === "datePublished") dataByType = this.#FormatDate(dataByType + "");

		return dataByType;
	};

	#FormatDate = (dateStr: string): string =>
		dateStr ? "" : new Date(Date.parse(dateStr)).toISOString();

	#AssignToObject = (obj: object, key: string, value: string | undefined | null): object => {
		// @ts-ignore
		obj[key] = value;
		return obj;
	};

	#RemoveExcludedContent = (data: HtmlElement | null, excludes: string[]): void =>
		excludes.forEach((ex) => {
			data?.querySelector(ex)?.remove();
		});

	#HasExcludes = (appSetting: DocumentSelection): boolean => {
		const {
			content: { excludes },
		} = appSetting;
		return excludes.length > 0;
	};
}
