import { useSelector, useDispatch } from 'react-redux';
import LoadingScreen from '../../Pages/LoadingScreen';
import Carousel from 'react-bootstrap/Carousel';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Anime from '../../Pages/Anime/Anime';
type Props = { Genres: any[]; Title: string };

function SimilarBanner({ Genres, Title }: Props) {
	const StoreID = useSelector((state: any) => state.IDState);
	const [SimilarAnime, setSimilarAnime] = useState<JSX.Element[]>();
	const [Loading, setLoading] = useState<boolean>(true);
	const Animes: any[] = [];

	const PopulateDetails = async () => {
		// Response gets specific animes genres
		const Response = await axios.get(
			`https://api.jikan.moe/v4/anime/${StoreID.id}/full`
		);
		const Genres = Response.data.data.genres;
		console.log('Genres', Genres);

		// Response 2 just gets all anime and compares genres
		const Response2 = await axios.get(`https://api.jikan.moe/v4/anime`);
		console.log('Genre Response2:', Response2);
		Response2.data.data.forEach((Anime: any) => {
			Genres.forEach((G: any) => {
				Anime.genres.forEach((Genre: any) => {
					if (G.name.toLowerCase() === Genre.name.toLowerCase()) {
						console.log('Matched Genre:', Genre.name);
						Animes.push(Anime);
					}
				});
			});
		});
		console.log('Animes:', Animes);
		console.log('SimilarAnime:', SimilarAnime);
		setSimilarAnime(Animes);
		setLoading(false);
	};

	useEffect(() => {
		// PopulateDetails();

		setTimeout(() => {
			axios
				.get(`https://api.jikan.moe/v4/anime`)
				.then((response) => {
					console.log('Genre response:', response);
					response.data.data.forEach((Anime: any) => {
						Genres.forEach((G: any) => {
							Anime.genres.forEach((Genre: any) => {
								if (G.name.toLowerCase() === Genre.name.toLowerCase()) {
									console.log('Matched Genre:', Genre.name);
									Animes.push(Anime);
								}
							});
						});
					});
				})
				.then(() => {
					const NewAnime = Animes.map((SimAn) => {
						return (
							<div className="SimilarAnimeContainer">
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
					console.log('Animes:', Animes);
					console.log('SimilarAnime:', SimilarAnime);
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
