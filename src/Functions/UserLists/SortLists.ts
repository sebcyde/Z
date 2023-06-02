import { AnimeList } from '../../Types/AnimeTypes';

export const SortLists = (Lists: any) => {
	let ListArray: any[] = [];

	for (const [key, value] of Object.entries(Lists)) {
		ListArray.push(value);
	}

	let Sorted = ListArray.sort(
		(a: AnimeList, b: AnimeList) => b.Updated - a.Updated
	);

	return Sorted;
};
