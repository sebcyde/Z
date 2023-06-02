import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../Pages/LoadingScreen';
import { Update } from '../../Store/Slices/AnimeSlice';
import AOS from 'aos';
import 'aos/dist/aos.css';

type Props = {
	URL?: string;
	Title: string;
	List?: [];
};

function AnimeListBanner({ URL, Title, List }: Props) {
	const [Loading, setLoading] = useState<boolean>(true);
	const [AnimeList, setAnimeList] = useState<JSX.Element[][]>();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		AOS.init();
	}, []);

	const NavigateAnimePage = async (ID: number) => {
		dispatch(Update(ID));
		navigate('/animedetails');
	};

	useEffect(() => {
		if (URL) {
			axios
				.get(URL)
				.then((response) => {
					const NewAnime = response.data.data.map((Ani: any, index: number) => {
						return (
							<>
								<div
									className="AnimeContainer"
									onClick={() => {
										NavigateAnimePage(Ani.mal_id);
									}}
								>
									<div className="AnimeImageContainer">
										<img
											className="AnimeImage"
											src={Ani.images.jpg.image_url}
										/>
									</div>
									<div className="AnimeDetailsContainer">
										<p className="AnimeName">{Ani.title}</p>
										{Ani.score ? (
											<span className="AnimeScoreContainer">
												<p className="AnimeScoreTitle">Score:</p>

												<div className="AnimeScore">{Ani.score}</div>
											</span>
										) : (
											''
										)}
										<p className="AnimeAiring">{Ani.status}</p>
									</div>
								</div>
							</>
						);
					});

					return NewAnime;
				})
				.then((NewAnime) => setAnimeList(NewAnime))
				.then(() => {
					setLoading(false);
				})
				.catch((err) => console.log(err));
		}
	}, [URL]);

	return (
		<div className="AnimeListBanner">
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<h2 className="Banner">{Title}</h2>
					<div className="BannerContainer">{AnimeList}</div>
				</>
			)}
		</div>
	);
}

export default AnimeListBanner;
