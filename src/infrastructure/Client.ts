import { IClient } from "../core/interfaces/IClient.js";
// @ts-ignore - error locating module, works as expected
import fetch from "node-fetch";

export class Client implements IClient {
	Get = async (url: string, options?: {}): Promise<string> => {
		const response = await fetch(url, options);
		return response.text();
	}
}
