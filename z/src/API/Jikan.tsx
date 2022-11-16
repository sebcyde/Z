import React, { useState } from 'react';
import axios from 'axios';
import { AnimeBaseContainer } from '../Styles/AnimeStyles';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Update } from '../Store/Slices/AnimeSlice';

export const Jikan = async (PageNumber: number | undefined = undefined) => {
	// const dispatch = useDispatch();
	// const navigate = useNavigate();
	const Endpoint =
		PageNumber === undefined
			? 'https://api.jikan.moe/v4/top/anime'
			: `https://api.jikan.moe/v4/top/anime?page=${PageNumber}`;

	const Response = await axios.get(Endpoint);
	const Data = await [Response.data.data, Response.data.pagination];
	console.log(Data);

	const NavigateAnimePage = async (ID: number) => {
		const Response2 = await axios.get(
			`https://api.jikan.moe/v4/anime/${ID}/full`
		);
		const Data2 = await Response2.data.data;
		console.log(Data2);
		// dispatch(Update(ID));
		// navigate(`anime/${ID}`);
	};

	const BaseAnime = await Promise.all(
		Data[0].map((Anime: any, index: number) => {
			return (
				<AnimeBaseContainer
					key={index}
					className=""
					onClick={() => {
						NavigateAnimePage(Anime.mal_id);
					}}
				>
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
