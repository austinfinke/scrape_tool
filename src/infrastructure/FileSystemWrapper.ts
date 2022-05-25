import { writeFile, readFile, readFileSync } from "fs";
import { IFileSystemWrapper } from "../core/interfaces/IFileSystemWrapper.js";

export class FileSystemWrapper implements IFileSystemWrapper {
	ReadFile = (path: string): string => readFileSync(path, "utf-8");

	WriteFile = (path: string, data: string, options?: {}): void =>
		writeFile(path, data, (e) => (e ? console.error(e) : 0));
}
