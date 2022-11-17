import { useSelector, useDispatch } from 'react-redux';
import LoadingScreen from '../../Pages/LoadingScreen';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
type Props = {};

function SimilarBanner({}: Props) {
	const StoreID = useSelector((state: any) => state.IDState);
	const [SimilarAnime, setSimilarAnime] = useState<object[]>([]);
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
						// setSimilarAnime(...SimilarAnime, Anime);
					}
				});
			});
		});
		console.log('Animes:', Animes);
		console.log('SimilarAnime:', SimilarAnime);
		setLoading(false);
	};

	// useEffect(() => {
	// 	PopulateDetails();
	// }, []);

	return (
		<div
			style={{
				width: '100%',
				height: '150px',
				backgroundColor: 'green',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{Loading ? (
				<LoadingScreen />
			) : (
				Animes.map((SimAn) => {
					return (
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								height: '100%',
							}}
						>
							<img
								src={SimAn.images.jpg.image_url}
								style={{ height: '100px', width: '70px' }}
							/>
							<h3> {SimAn.title}</h3>
							<h3> Episodes: {SimAn.episodes}</h3>
						</div>
					);
				})
			)}
		</div>
	);
}

export default SimilarBanner;
