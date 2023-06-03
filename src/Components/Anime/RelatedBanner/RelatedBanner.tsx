import React, { useEffect } from 'react';
import { Anime } from '../../../Types/AnimeTypes';
import axios from 'axios';
import { GetSingleAnime } from '../../../Functions/AnimeData.ts/GetSingleAnime';
import { makeSequentialNamedAPICalls } from '../../../Functions/Helpers/MakeMultipleAPICalls';

type Props = {
	Related: [
		{
			entry: [
				{
					mal_id: number;
					type: string;
					name: string;
					url: string;
				}
			];
			relation: string;
		}
	];
};

const RelatedBanner = ({ Related }: Props) => {
	console.log('Related Titles:', Related);

	const PullData = async () => {
		const RelatedNamedURLs = Related.map((RelatedItem) => {
			return {
				url: `https://api.jikan.moe/v4/anime/${RelatedItem.entry[0].mal_id}/full`,
				name: RelatedItem.relation,
			};
		});
		console.log('RelatedNamedURLs:', RelatedNamedURLs);

		const AllData = await makeSequentialNamedAPICalls(RelatedNamedURLs);
		console.log('All Data:', AllData);
	};

	useEffect(() => {
		PullData();
	}, []);

	return (
		<div className="RelatedAnimeBannerContainer">
			<h3>Related Titles:</h3>
			<div className="RelatedAnimeContainer">
				{/* {Related.map((RelatedAnime) => {
					const Anime = RelatedAnime.entry[0];
					return (
						<div className="RelatedAnimeItemContainer">
							<p>{Anime.name}</p>
						</div>
					);
				})} */}
			</div>
		</div>
	);
};

export default RelatedBanner;
