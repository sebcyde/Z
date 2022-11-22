import React from 'react';
import UpcomingCarousel from '../../Components/Homepage/UpcomingCarousel';
import ForYou from '../../Components/Homepage/ForYou';
import WelcomeBanner from '../../Components/Homepage/WelcomeBanner';
import AnimeListBanner from '../../Components/Anime/AnimeListBanner';
import TopPoster from '../../Components/Homepage/TopPoster';

type Props = {};

function Homepage({}: Props) {
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
			<AnimeListBanner
				URL="https://api.jikan.moe/v4/top/manga"
				Title="Top Manga"
			/>
			<TopPoster URL="https://api.jikan.moe/v4/seasons/upcoming" />
			{/* <ForYou /> */}
		</div>
	);
}

export default Homepage;
