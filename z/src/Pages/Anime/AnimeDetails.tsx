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
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import { getAuth } from 'firebase/auth';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

type Props = {};

function AnimeDetails({}: Props) {
	const StoreID = useSelector((state: any) => state.IDState);
	const [AnimeData, setAnimeData] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);
	const [ModalLoading, setModalLoading] = useState<boolean>(true);
	const [UserLists, setUserLists] = useState<any[]>([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const InMyList: boolean = false;
	const InFavourites: boolean = false;
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const ResetID = () => {
		dispatch(Update(0));
		navigate('/');
	};

	const ShowDetails = () => {
		console.log(AnimeData);
	};

	const alertClicked = () => {
		alert('You clicked the third ListGroupItem');
	};

	const PullFavourites = async () => {
		setModalLoading(true);
		const auth = getAuth();
		const user = auth.currentUser;
		if (user) {
			const docRef = doc(db, `Users/${user.uid}`);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				const Lists = data.UserLists;
				console.log('Lists:', Lists);
				setUserLists(Object.keys(Lists));
				setModalLoading(false);
			} else {
				console.log('No such document!');
			}
		}
	};

	const AddFavourite = async (Item: object) => {
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

	const AddToList = async (List: string, Item: object) => {
		console.log('List to add to:', List);
		console.log('Item to add:', Item);
		// Add To DB
		const auth = getAuth();
		const user = auth.currentUser;
		if (user) {
			const UserDB = doc(db, `Users/${user.uid}`);
			await updateDoc(UserDB, {
				UserLists: arrayUnion(Item),
			});
			console.log('Item Added To List');
			handleClose();
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
					<Modal show={show} onHide={handleClose} onShow={PullFavourites}>
						<Modal.Header closeButton>
							<Modal.Title>Add to list</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{ModalLoading ? (
								<LoadingScreen />
							) : (
								<ListGroup defaultActiveKey="#link1">
									{UserLists.map((list, index: number) => {
										return (
											<ListGroup.Item
												action
												onClick={() => {
													AddToList(list, AnimeData);
												}}
												key={index}
											>
												{list}
											</ListGroup.Item>
										);
									})}
								</ListGroup>
							)}
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Cancel
							</Button>
						</Modal.Footer>
					</Modal>

					<div className="AnimeDetailsContainer">
						<img src={AnimeData.images.jpg.large_image_url} />
						<h2 className="AnimeTitle">{AnimeData.title}</h2>
						<span className="AnimeScoreContainer">
							<p>Rank: {AnimeData.rank}</p>
							<p>Score: {AnimeData.score}</p>
						</span>
						<span className="ButtonContainer">
							<button className="AddButton" onClick={handleShow}>
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
