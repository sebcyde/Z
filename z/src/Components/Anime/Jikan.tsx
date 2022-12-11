import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnimeListBanner from './AnimeListBanner';

function Jikan() {
	return (
		<div>
			<AnimeListBanner
				URL="https://api.jikan.moe/v4/top/anime"
				Title="Top Anime"
			/>
			<AnimeListBanner
				URL="https://api.jikan.moe/v4/seasons/upcoming"
				Title="Upcoming Anime"
			/>
			<AnimeListBanner
				URL="https://api.jikan.moe/v4/seasons/now"
				Title="Current Season"
			/>
		</div>
	);
}

export default Jikan;
