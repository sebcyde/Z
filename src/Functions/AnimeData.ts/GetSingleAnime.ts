import axios from 'axios';

export const GetSingleAnime = async (AnimeID: number) => {
	const Data = await axios.get(
		`https://api.jikan.moe/v4/anime/${AnimeID}/full`
	);
	return Data.data.data;
};
