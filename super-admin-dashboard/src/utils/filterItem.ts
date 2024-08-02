


export const filterItems = <T, K extends keyof T>(items: T[], searchTerm: string, key: K): T[] => {
	return items.filter(item => {
		const value = item[key];
		return typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase());
	});
};
