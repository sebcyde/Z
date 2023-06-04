import { useDispatch } from 'react-redux';
import LoadingScreen from '../../../Pages/LoadingScreen';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Update } from '../../../Store/Slices/AnimeSlice';
import { Anime } from '../../../Types/AnimeTypes';

type Props = { Genres: any[]; Title: string };
type AnimeComponentParams = { Anime: Anime };

function SimilarBanner({ Genres, Title }: Props) {
	const [SimilarAnime, setSimilarAnime] = useState<JSX.Element[]>();
	const [Loading, setLoading] = useState<boolean>(true);
	const dispatch = useDispatch();
	const Animes: any[] = [];

	const NavigateAnimePage = async (ID: number) => {
		dispatch(Update(ID));
	};

	const AnimeComponent = ({ Anime }: AnimeComponentParams) => {
		return (
			<>
				<div
					className="AnimeContainer"
					onClick={() => {
						NavigateAnimePage(Anime.mal_id);
					}}
				>
					<div className="AnimeImageContainer">
						<img className="AnimeImage" src={Anime.images.jpg.image_url} />
					</div>
					<div className="AnimeDetailsContainer">
						<p className="AnimeName">{Anime.title}</p>
						<span className="AnimeScoreContainer">
							<p className="AnimeScoreTitle">Score:</p>

							<div className="AnimeScore">{Anime.score}</div>
						</span>
						<p className="AnimeAiring">{Anime.status}</p>
					</div>
				</div>
			</>
		);
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
					return Animes.map((SimAn, index: number) => {
						return <AnimeComponent Anime={SimAn} />;
					});
				})
				.then((FormattedAnime) => setSimilarAnime(FormattedAnime))
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
