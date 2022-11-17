import { useSelector, useDispatch } from 'react-redux';
import LoadingScreen from '../../Pages/LoadingScreen';
import Carousel from 'react-bootstrap/Carousel';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Manga from '../../Pages/Manga/Manga';
import { UpdateMangaID } from '../../Store/Slices/MangaSlice';
import { Container } from 'react-bootstrap/lib/Tab';
type Props = { Genres: any[]; Title: string };

function SimilarBanner({ Genres, Title }: Props) {
	const StoreMangaID = useSelector((state: any) => state.MangaIDState);
	const [SimilarManga, setSimilarManga] = useState<JSX.Element[]>();
	const [Loading, setLoading] = useState<boolean>(true);
	const Con = document.querySelector('.MangaDetailsContainer');
	const dispatch = useDispatch();
	const Mangas: any[] = [];

	const NavigateMangaPage = async (ID: number) => {
		dispatch(UpdateMangaID(ID));
	};

	useEffect(() => {
		setTimeout(() => {
			axios
				.get(`https://api.jikan.moe/v4/manga`)
				.then((response) => {
					response.data.data.forEach((Manga: any) => {
						Genres.forEach((G: any) => {
							Manga.genres.forEach((Genre: any) => {
								if (G.name.toLowerCase() === Genre.name.toLowerCase()) {
									Mangas.push(Manga);
								}
							});
						});
					});
				})
				.then(() => {
					const NewManga = Mangas.map((SimManga, index: number) => {
						return (
							<div
								key={index}
								className="SimilarMangaContainer"
								onClick={() => {
									NavigateMangaPage(SimManga.mal_id);
								}}
							>
								<img src={SimManga.images.jpg.image_url} />
								<div className="SimilarMangaDetailsContainer">
									<h3 className="SimilarMangaTitle">{SimManga.title}</h3>
									<h3 className="SimilarMangaEpisodes">
										Episodes: {SimManga.episodes}
									</h3>
								</div>
								<span className="SimilarMangaGenres">
									<p>{SimManga.genres[0].name}</p>
									<p>{SimManga.genres[1].name}</p>
								</span>
							</div>
						);
					});

					return NewManga;
				})
				.then((NewManga) => setSimilarManga(NewManga))
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
					<h2 className="BannerSimilar">Manga Like {Title}</h2>
					<div className="SimilarContainer">{SimilarManga} </div>
				</>
			)}
		</div>
	);
}

export default SimilarBanner;
