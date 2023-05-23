import React, { useEffect, useState } from 'react';
import WelcomeBanner from '../../Components/Homepage/WelcomeBanner';
import AnimeListBanner from '../../Components/Anime/AnimeListBanner';
import TopPoster from '../../Components/Homepage/TopPoster';
import FavouritesCarousel from '../../Components/Homepage/FavouritesCarousel';
import 'aos/dist/aos.css';

import { GetUserData } from '../../Functions/UserDetails/GetUserData';
import { getAuth } from 'firebase/auth';
import { ListItem } from '../../Components/Anime/ListItem';
import { GetUserLists } from '../../Functions/UserDetails/GetUserLists';

type Props = {};

function Homepage({}: Props) {
	const [FaveCarousel, setFaveCarousel] = useState<any>();
	const [TopPoster0, setTopPoster0] = useState<any>();
	const [Banner0, setBanner0] = useState<any>();
	const [Loading, setLoading] = useState(true);
	const [UserData, setUserData] = useState();
	const auth = getAuth();
	const user = auth.currentUser;

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setBanner0(
	// 			<AnimeListBanner
	// 				URL="https://api.jikan.moe/v4/top/manga"
	// 				Title="Top Manga"
	// 			/>
	// 		);
	// 		setTopPoster0(
	// 			<TopPoster URL="https://api.jikan.moe/v4/seasons/upcoming" />
	// 		);
	// 	}, 2000);
	// }, []);

	const PullData = async () => {
		if (user) {
			const RawUserData = await GetUserData(user.uid);
			const RawUserLists = await GetUserLists(user.uid);
			// setUserData(RawUserData)
			console.log('User Data:', RawUserData);
			console.log('User Lists:', RawUserLists);
		}
	};

	useEffect(() => {
		PullData().then(() => setLoading(false));
	}, []);

	return (
		<div
			className="page"
			style={{ overflowY: 'scroll', paddingBottom: '40px' }}
		>
			<WelcomeBanner />
			<TopPoster URL="https://api.jikan.moe/v4/seasons/now" />
			<AnimeListBanner
				URL="https://api.jikan.moe/v4/seasons/upcoming"
				Title="Upcoming Anime"
			/>

			{/* {!Loading && <ListItem Anime={} />} */}
			<AnimeListBanner
				URL="https://api.jikan.moe/v4/top/anime"
				Title="Top Anime"
			/>

			<FavouritesCarousel />
			{/* {Banner0}

			{TopPoster0} */}
		</div>
	);
}

export default Homepage;
