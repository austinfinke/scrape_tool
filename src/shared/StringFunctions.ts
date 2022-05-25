export function IsNullOrWhiteSpace(test: string): boolean {
	if (test === null || test === undefined || test.trim().length === 0)
		return true;

	return false;
}
