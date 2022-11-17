import { Update } from '../../Store/Slices/AnimeSlice';
import React, { useEffect, useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import SimilarBanner from '../../Components/Anime/SimilarBanner';
import Anime from './Anime';
import LoadingScreen from '../LoadingScreen';

type Props = {};

function AnimeDetails({}: Props) {
	const StoreID = useSelector((state: any) => state.IDState);
	const [AnimeData, setAnimeData] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);
	const dispatch = useDispatch();
	const InMyList: boolean = false;
	const InFavourites: boolean = false;

	useEffect(() => {
		console.log(StoreID);
	}, [StoreID]);

	const ResetID = () => {
		dispatch(Update(0));
	};

	const ShowDetails = () => {
		console.log(AnimeData);
	};

	const PopulateDetails = async () => {
		const Response = await axios
			.get(`https://api.jikan.moe/v4/anime/${StoreID.id}/full`)
			.then((Response) => {
				const Data = Response.data.data;
				console.log(Data);
				setAnimeData(Data);
			});
	};

	useEffect(() => {
		// PopulateDetails();

		axios
			.get(`https://api.jikan.moe/v4/anime/${StoreID.id}/full`)
			.then((Response) => {
				const Data = Response.data.data;
				return Data;
			})
			.then((Data) => {
				console.log(Data);
				setAnimeData(Data);
				console.log(AnimeData);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="page" style={{ overflowY: 'scroll' }}>
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<div className="AnimeDetailsContainer">
						<img src={AnimeData.images.jpg.large_image_url} />
						<h2 className="AnimeTitle">{AnimeData.title}</h2>
						<span className="AnimeScoreContainer">
							<p>Rank: {AnimeData.rank}</p>
							<p>Score: {AnimeData.score}</p>
						</span>
						<span className="ButtonContainer">
							<button className="AddButton">
								Add To MyList
								{InMyList ? (
									<span className="material-symbols-outlined">
										playlist_add_check
									</span>
								) : (
									<span className="material-symbols-outlined">
										playlist_add
									</span>
								)}
							</button>

							<button className="AddButton">
								Add To Favourites
								{InFavourites ? (
									<span className="material-symbols-outlined">star</span>
								) : (
									<span className="material-symbols-outlined">star</span>
								)}
							</button>
						</span>
						<span className="AnimeGenreContainer">
							{AnimeData.genres.forEach((element: any) => {
								return <Badge className="AnimeGenreTag">{element.name}</Badge>;
							})}
						</span>
						<p className="AnimeSynopsis">{AnimeData.synopsis}</p>
					</div>

					<SimilarBanner />
				</>
			)}

			<Button onClick={ResetID}>Reset ID</Button>
			<Button onClick={ShowDetails}>Show Details</Button>
		</div>
	);
}

export default AnimeDetails;
