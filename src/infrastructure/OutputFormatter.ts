import { IOutputFormatter } from "../core/interfaces/IOutputFormatter.js";

export class OutputFormatter implements IOutputFormatter {
	SerializeJson = (json: JSON): string => JSON.stringify(json);
    ParseToJson = (item: string): JSON => JSON.parse(item);
}
