import { Anime } from '../../Types/AnimeTypes';

export const CreateList = async (ListName: string, AnimeToAdd: Anime) => {
	console.log(`Creating ${ListName} with ${AnimeToAdd.title}`);
};
