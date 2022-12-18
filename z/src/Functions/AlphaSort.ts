export const AlphaSort = (Array: any[]) => {
	return Array.sort((a: string, b: string) => a.localeCompare(b));
};

export const ZSort = (Array: any[]) => {
	return Array.sort((a: string, b: string) => b.localeCompare(a));
};
