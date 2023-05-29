import { GetUserLists } from '../../Functions/UserLists/GetUserLists';
import { GetUserData } from '../../Functions/UserDetails/GetUserData';
import AnimeListBanner from '../../Components/Anime/AnimeListBanner';
import WelcomeBanner from '../../Components/Homepage/WelcomeBanner';
import { ListCarousel } from '../../Components/Anime/ListCarousel';
import TopPoster from '../../Components/Homepage/TopPoster';
import LoadingScreen from '../LoadingScreen';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import 'aos/dist/aos.css';

function Homepage() {
	const [RecentList, setRecentList] = useState<any>();
	const [Loading, setLoading] = useState(true);
	const auth = getAuth();
	const user = auth.currentUser;

	const PullData = async () => {
		if (user) {
			const RawUserData = await GetUserData(user.uid);
			const RawUserLists = await GetUserLists(user.uid);
			// setUserData(RawUserData)
			console.log('User Data:', RawUserData);
			console.log('User Lists:', RawUserLists);

			// Getting first entry of user lists
			if (RawUserLists) {
				const entries = Object.entries(RawUserLists);
				if (entries[0] && entries[0][1]) {
					setRecentList(entries[0]);
				}
			}
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
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
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

					{RecentList && RecentList[1].Anime ? (
						<ListCarousel ListName={RecentList[0]} List={RecentList[1].Anime} />
					) : (
						''
					)}
				</>
			)}
		</div>
	);
}

export default Homepage;
