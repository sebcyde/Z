import React, { useState } from 'react';
import axios from 'axios';
import { AnimeBaseContainer } from '../Styles/AnimeStyles';

// Object for API call parameters

export const Jikan = async () => {
	const Response = await axios.get('https://api.jikan.moe/v4/anime');
	const Data = await [Response.data.data, Response.data.pagination];
	console.log(Data);

	const BaseAnime = await Promise.all(
		Data[0].map((Anime: any, index: number) => {
			return (
				<AnimeBaseContainer key={index} className="">
					<div>
						<h2>
							{Anime.title} - {Anime.year}
						</h2>

						<span>
							<p>Rank: {Anime.rank}</p>
							<p>Score: {Anime.score} / 10</p>
						</span>
					</div>

					<img src={Anime.images.jpg.image_url} />
				</AnimeBaseContainer>
			);
		})
	);
	return [BaseAnime, Data[1]];
};
