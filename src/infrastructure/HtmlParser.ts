// @ts-ignore
import { HTMLElement, parse } from "node-html-parser";
import { IHtmlParser } from "../core/interfaces/IHtmlParser.js";

export class HtmlParser implements IHtmlParser {
	constructor() {}
	LoadHtml = (html: string, options?: {}): HTMLElement => parse(html, options).removeWhitespace();
}
