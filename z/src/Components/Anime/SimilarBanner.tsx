import { useSelector, useDispatch } from 'react-redux';
import LoadingScreen from '../../Pages/LoadingScreen';
import Carousel from 'react-bootstrap/Carousel';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Anime from '../../Pages/Anime/Anime';
import { Update } from '../../Store/Slices/AnimeSlice';
import { Container } from 'react-bootstrap/lib/Tab';
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
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
							<Card
								key={index}
								className="AnimeContainer"
								onClick={() => {
									NavigateAnimePage(SimAn.mal_id);
								}}
							>
								<CardActionArea>
									<CardMedia
										component="img"
										height="140"
										image={SimAn.images.jpg.image_url}
										alt="green iguana"
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="div">
											{SimAn.title}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
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
