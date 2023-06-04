import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SimilarBanner from '../../Components/Manga/SimilarBanner';
import YouTubeEmbed from '../../Components/Anime/DetailsComponents/YouTubeEmbed';
import { UpdateMangaID } from '../../Store/Slices/MangaSlice';
import LoadingScreen from '../LoadingScreen';

type Props = {};

function MangaDetails({}: Props) {
	const StoreMangaID = useSelector((state: any) => state.MangaIDState);
	const [MangaData, setMangaData] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);
	const dispatch = useDispatch();
	const InMyList: boolean = false;
	const InFavourites: boolean = false;

	useEffect(() => {
		console.log(StoreMangaID);
	}, [StoreMangaID]);

	const ResetID = () => {
		dispatch(UpdateMangaID(0));
	};

	const ShowDetails = () => {
		console.log(MangaData);
	};

	const AddToList = () => {
		console.log('Added to List');
	};

	const AddToFavourites = () => {
		console.log('Added to Favourites');
	};

	useEffect(() => {
		axios
			.get(`https://api.jikan.moe/v4/manga/${StoreMangaID.id}/full`)
			.then((Response) => {
				const Data = Response.data.data;
				return Data;
			})
			.then((Data) => {
				setMangaData(Data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [StoreMangaID]);

	return (
		<div className="page" style={{ overflowY: 'scroll' }}>
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<div className="MangaDetailsContainer">
						<img src={MangaData.images.jpg.large_image_url} />
						<h2 className="MangaTitle">{MangaData.title}</h2>
						<span className="MangaScoreContainer">
							<p>Rank: {MangaData.rank}</p>
							<p>Score: {MangaData.score}</p>
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

							<button className="AddButton" onClick={AddToFavourites}>
								Add To Favourites
								{InFavourites ? (
									<span className="material-symbols-outlined">star</span>
								) : (
									<span className="material-symbols-outlined">star</span>
								)}
							</button>
						</span>
						<span className="MangaGenreContainer">
							{MangaData.genres.forEach((element: any) => {
								return <div className="MangaGenreTag">{element.name}</div>;
							})}
						</span>
						<h3 className="MangaSynopsisTitle">Synopsis:</h3>
						<p className="MangaSynopsis">{MangaData.synopsis}</p>
					</div>
					{/* <YouTubeEmbed ID={MangaData.trailer.youtube_id} /> */}
					<SimilarBanner Genres={MangaData.genres} Title={MangaData.title} />
				</>
			)}

			<Button onClick={ResetID}>Reset ID</Button>
			<Button onClick={ShowDetails}>Show Details</Button>
		</div>
	);
}

export default MangaDetails;
