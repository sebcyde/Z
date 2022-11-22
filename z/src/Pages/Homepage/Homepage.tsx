import React, { useEffect, useState } from 'react';
import WelcomeBanner from '../../Components/Homepage/WelcomeBanner';
import AnimeListBanner from '../../Components/Anime/AnimeListBanner';
import TopPoster from '../../Components/Homepage/TopPoster';
import FavouritesCarousel from '../../Components/Homepage/FavouritesCarousel';

type Props = {};

function Homepage({}: Props) {
	const [BannerOne, setBannerOne] = useState<string>('');
	const [BannerTwo, setBannerTwo] = useState<string>('');

	useEffect(() => {
		setTimeout(() => {
			setBannerOne('https://api.jikan.moe/v4/top/manga');
		}, 1000);
		setTimeout(() => {
			setBannerTwo('https://api.jikan.moe/v4/seasons/upcoming');
		}, 2000);
	}, []);

	return (
		<div className="page" style={{ overflowY: 'scroll' }}>
			<WelcomeBanner />
			<TopPoster URL="https://api.jikan.moe/v4/seasons/now" />
			<AnimeListBanner
				URL="https://api.jikan.moe/v4/seasons/upcoming"
				Title="Upcoming Anime"
			/>
			<AnimeListBanner
				URL="https://api.jikan.moe/v4/top/anime"
				Title="Top Anime"
			/>
			<FavouritesCarousel />
			<AnimeListBanner URL={BannerOne} Title="Top Manga" />
			<TopPoster URL={BannerTwo} />
		</div>
	);
}

export default Homepage;
