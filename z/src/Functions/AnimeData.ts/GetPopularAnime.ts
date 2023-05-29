import axios from 'axios';
import { Anime } from '../../Types/AnimeTypes';

export const GetPopularAnime = async (): Promise<Anime[]> => {
	const Data = await axios.get('https://api.jikan.moe/v4/top/anime');
	return Data.data.data;
};
