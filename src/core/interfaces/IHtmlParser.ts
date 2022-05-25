import { HTMLElement } from "node-html-parser";

export interface IHtmlParser {
    LoadHtml: (html: string, options?: {}) => HtmlElement;
}

export class HtmlElement extends HTMLElement {}