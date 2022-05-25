export interface IClient {
    Get: (path: string, options?: {}) => Promise<string>;
}