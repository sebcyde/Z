import React, { useEffect, useState } from 'react';
import WelcomeBanner from '../../Components/Homepage/WelcomeBanner';
import AnimeListBanner from '../../Components/Anime/AnimeListBanner';
import TopPoster from '../../Components/Homepage/TopPoster';
import FavouritesCarousel from '../../Components/Homepage/FavouritesCarousel';
import AOS from 'aos';
import 'aos/dist/aos.css';

type Props = {};

function Homepage({}: Props) {
	const [FaveCarousel, setFaveCarousel] = useState<any>();
	const [TopPoster0, setTopPoster0] = useState<any>();
	const [Banner0, setBanner0] = useState<any>();

	useEffect(() => {
		setTimeout(() => {
			setBanner0(
				<AnimeListBanner
					URL="https://api.jikan.moe/v4/top/manga"
					Title="Top Manga"
				/>
			);
			setTopPoster0(
				<TopPoster URL="https://api.jikan.moe/v4/seasons/upcoming" />
			);
		}, 2000);
	}, []);

	return (
		<div className="page" style={{ overflowY: 'scroll' }}>
			<WelcomeBanner />
			<TopPoster URL="https://api.jikan.moe/v4/seasons/now" />
			<AnimeListBanner
				URL="https://api.jikan.moe/v4/top/anime"
				Title="Top Anime"
			/>
			<AnimeListBanner
				URL="https://api.jikan.moe/v4/seasons/upcoming"
				Title="Upcoming Anime"
			/>

			<FavouritesCarousel />
			{Banner0}

			{TopPoster0}
		</div>
	);
}

export default Homepage;
