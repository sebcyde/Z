import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnimeListBanner from './AnimeListBanner';

function Jikan() {
	const dispatch = useDispatch();

	return (
		<div>
			<AnimeListBanner
				URL="https://api.jikan.moe/v4/top/anime"
				Title="Top Anime"
				SlideDelay="0"
			/>
			<AnimeListBanner
				URL="https://api.jikan.moe/v4/seasons/upcoming"
				Title="Upcoming Anime"
				SlideDelay="100"
			/>
			<AnimeListBanner
				URL="https://api.jikan.moe/v4/seasons/now"
				Title="Current Season"
				SlideDelay="200"
			/>
		</div>
	);
}

export default Jikan;
