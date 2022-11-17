import { useSelector, useDispatch } from 'react-redux';
import LoadingScreen from '../../Pages/LoadingScreen';
import Carousel from 'react-bootstrap/Carousel';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Anime from '../../Pages/Anime/Anime';
import { Update } from '../../Store/Slices/AnimeSlice';
import { Container } from 'react-bootstrap/lib/Tab';
type Props = { Genres: any[]; Title: string };

function SimilarBanner({ Genres, Title }: Props) {
	const StoreID = useSelector((state: any) => state.IDState);
	const [SimilarAnime, setSimilarAnime] = useState<JSX.Element[]>();
	const [Loading, setLoading] = useState<boolean>(true);
	const Con = document.querySelector('.AnimeDetailsContainer');
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
					const NewAnime = Animes.map((SimAn) => {
						return (
							<div
								className="SimilarAnimeContainer"
								onClick={() => {
									NavigateAnimePage(SimAn.mal_id);
								}}
							>
								<img src={SimAn.images.jpg.image_url} />
								<div className="SimilarAnimeDetailsContainer">
									<h3 className="SimilarAnimeTitle">{SimAn.title}</h3>
									<h3 className="SimilarAnimeEpisodes">
										Episodes: {SimAn.episodes}
									</h3>
								</div>
								<span className="SimilarAnimeGenres">
									<p>{SimAn.genres[0].name}</p>
									<p>{SimAn.genres[1].name}</p>
								</span>
							</div>
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
