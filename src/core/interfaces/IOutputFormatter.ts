export interface IOutputFormatter {
	SerializeJson: (json: JSON) => string;
	ParseToJson: (item: string) => JSON;
}
