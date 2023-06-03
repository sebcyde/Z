import { useDispatch } from 'react-redux';
import LoadingScreen from '../../../Pages/LoadingScreen';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Update } from '../../../Store/Slices/AnimeSlice';
type Props = { Genres: any[]; Title: string };

function SimilarBanner({ Genres, Title }: Props) {
	const [SimilarAnime, setSimilarAnime] = useState<JSX.Element[]>();
	const [Loading, setLoading] = useState<boolean>(true);
	const dispatch = useDispatch();
	const Animes: any[] = [];

	const NavigateAnimePage = async (ID: number) => {
		dispatch(Update(ID));
	};

	useEffect(() => {
		setTimeout(() => {
			axios
				.get(`https://api.jikan.moe/v4/anime`)
				.then((response) => {
					response.data.data.forEach((Anime: any) => {
						Genres.forEach((G: any) => {
							Anime.genres.forEach((Genre: any) => {
								if (G.name.toLowerCase() === Genre.name.toLowerCase()) {
									Animes.push(Anime);
								}
							});
						});
					});
				})
				.then(() => {
					const NewAnime = Animes.map((SimAn, index: number) => {
						return (
							<>
								<div
									className="AnimeContainer"
									onClick={() => {
										NavigateAnimePage(SimAn.mal_id);
									}}
								>
									<div className="AnimeImageContainer">
										<img
											className="AnimeImage"
											src={SimAn.images.jpg.image_url}
										/>
									</div>
									<div className="AnimeDetailsContainer">
										<p className="AnimeName">{SimAn.title}</p>
										<span className="AnimeScoreContainer">
											<p className="AnimeScoreTitle">Score:</p>

											<div className="AnimeScore">{SimAn.score}</div>
										</span>
										<p className="AnimeAiring">{SimAn.status}</p>
									</div>
								</div>
							</>
						);
					});

					return NewAnime;
				})
				.then((NewAnime) => setSimilarAnime(NewAnime))
				.then(() => {
					setLoading(false);
				})
				.catch((err) => console.log(err));
		}, 1000);
	}, []);

	return (
		<div className="SimilarBanner">
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<h2 className="BannerSimilar">Anime Like {Title}</h2>
					<div className="SimilarContainer">{SimilarAnime} </div>
				</>
			)}
		</div>
	);
}

export default SimilarBanner;
