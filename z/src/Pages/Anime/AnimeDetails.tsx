import { Update } from '../../Store/Slices/AnimeSlice';
import React, { useEffect, useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import SimilarBanner from '../../Components/Anime/SimilarBanner';
import Anime from './Anime';
import LoadingScreen from '../LoadingScreen';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import YouTubeEmbed from '../../Components/YouTube/YouTubeEmbed';
import { Navigate, useNavigate } from 'react-router-dom';
import { AddToFavourites } from '../../Store/Slices/FavouritesListSlice';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import { getAuth } from 'firebase/auth';

type Props = {};

function AnimeDetails({}: Props) {
	const StoreID = useSelector((state: any) => state.IDState);
	const [AnimeData, setAnimeData] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const InMyList: boolean = false;
	const InFavourites: boolean = false;

	useEffect(() => {
		console.log(StoreID);
	}, [StoreID]);

	const ResetID = () => {
		dispatch(Update(0));
		navigate('/');
	};

	const ShowDetails = () => {
		console.log(AnimeData);
	};

	const AddToList = () => {
		console.log('Added to List');
	};

	const AddFavourite = async (Item: object) => {
		console.log('Added to Favourites');
		dispatch(AddToFavourites(Item));

		// Add To DB
		const auth = getAuth();
		const user = auth.currentUser;
		if (user) {
			const UserDB = doc(db, `Users/${user.uid}`);
			await updateDoc(UserDB, {
				'UserLists.Favourites': arrayUnion(Item),
			});
			console.log('Item Added To Favourites:', user);
		}
	};

	useEffect(() => {
		axios
			.get(`https://api.jikan.moe/v4/anime/${StoreID.id}/full`)
			.then((Response) => {
				const Data = Response.data.data;
				return Data;
			})
			.then((Data) => {
				console.log(Data);
				setAnimeData(Data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [StoreID]);

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
							<button className="AddButton" onClick={AddToList}>
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

							<button
								className="AddButton"
								onClick={() => AddFavourite(AnimeData)}
							>
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
								return <div className="AnimeGenreTag">{element.name}</div>;
							})}
						</span>

						{AnimeData.airing == false &&
						AnimeData.status === 'Not yet aired' ? (
							<p className="AnimeSynopsis">{AnimeData.status}</p>
						) : (
							''
						)}

						<h3 className="AnimeSynopsisTitle">Synopsis:</h3>
						<p className="AnimeSynopsis">{AnimeData.synopsis}</p>
					</div>
					<YouTubeEmbed ID={AnimeData.trailer.youtube_id} />
					<SimilarBanner Genres={AnimeData.genres} Title={AnimeData.title} />
				</>
			)}

			<Button onClick={ResetID}>Reset ID</Button>
			<Button onClick={ShowDetails}>Show Details</Button>
		</div>
	);
}

export default AnimeDetails;
