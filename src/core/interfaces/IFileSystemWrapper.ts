export interface IFileSystemWrapper {
	ReadFile: (path: string) => string;
	WriteFile: (path: string, data: string, options?: {}) => void;
}
