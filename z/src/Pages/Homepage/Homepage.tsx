import React, { useEffect, useState } from 'react';
import WelcomeBanner from '../../Components/Homepage/WelcomeBanner';
import AnimeListBanner from '../../Components/Anime/AnimeListBanner';
import TopPoster from '../../Components/Homepage/TopPoster';
import FavouritesCarousel from '../../Components/Homepage/FavouritesCarousel';

type Props = {};

function Homepage({}: Props) {
	const [FaveCarousel, setFaveCarousel] = useState<any>();
	const [Banner0, setBanner0] = useState<any>();
	const [Banner1, setBanner1] = useState<any>();
	const [Banner2, setBanner2] = useState<any>();
	const [TopPoster0, setTopPoster0] = useState<any>();

	useEffect(() => {
		setTimeout(() => {
			setBanner0(
				<AnimeListBanner
					URL="https://api.jikan.moe/v4/seasons/upcoming"
					Title="Upcoming Anime"
				/>
			);
			setBanner1(
				<AnimeListBanner
					URL="https://api.jikan.moe/v4/top/manga"
					Title="Top Manga"
				/>
			);
			setBanner2(
				<AnimeListBanner
					URL="https://api.jikan.moe/v4/top/anime"
					Title="Top Anime"
				/>
			);
			setFaveCarousel(<FavouritesCarousel />);
		}, 1000);
		setTimeout(() => {
			setTopPoster0(
				<TopPoster URL="https://api.jikan.moe/v4/seasons/upcoming" />
			);
		}, 2000);
	}, []);

	return (
		<div className="page" style={{ overflowY: 'scroll' }}>
			<WelcomeBanner />
			<TopPoster URL="https://api.jikan.moe/v4/seasons/now" />
			{Banner0}
			{Banner1}
			{Banner2}
			{FaveCarousel}
			{TopPoster0}
		</div>
	);
}

export default Homepage;
