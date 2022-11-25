import { Update } from '../../Store/Slices/AnimeSlice';
import React, { useEffect, useState, useRef } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import SimilarBanner from '../../Components/Anime/SimilarBanner';
import Anime from './Anime';
import LoadingScreen from '../LoadingScreen';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import YouTubeEmbed from '../../Components/YouTube/YouTubeEmbed';
import { Navigate, useNavigate } from 'react-router-dom';
import {
	doc,
	updateDoc,
	arrayUnion,
	getDoc,
	getDocs,
	query,
	collection,
} from 'firebase/firestore';
import { db } from '../../config/Firebase';
import { getAuth } from 'firebase/auth';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import { BsPlusLg } from 'react-icons/bs';
import '../../Styles/Modal.scss';

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
	const [Editing, setEditing] = useState<boolean>(false);
	const NewListRef = useRef<HTMLInputElement>();
	const auth = getAuth();
	const user = auth.currentUser;

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const ResetID = () => {
		dispatch(Update(0));
		navigate('/');
	};

	const ShowDetails = () => {
		console.log(AnimeData);
	};

	const PullLists = async () => {
		setModalLoading(true);

		if (user) {
			const docRef = doc(db, `Users/${user.uid}/MoreInfo/Lists`);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const Lists = docSnap.data();
				// const Lists = data.UserLists;
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

		if (user) {
			const UserDB = doc(db, `Users/${user.uid}/MoreInfo/Lists`);
			await updateDoc(UserDB, {
				Favourites: arrayUnion(Item),
			});
			console.log('Item Added To Favourites');
			PullLists();
			handleClose();
		}
	};

	const AddToList = async (List: string, Item: object) => {
		console.log('List to add to:', List);
		console.log('Item to add:', Item);
		// Add To DB

		if (user) {
			const UserDB = doc(db, `Users/${user.uid}/MoreInfo/Lists`);
			await updateDoc(UserDB, {
				[List]: arrayUnion(Item),
			});
			console.log('Item Added To:', List);
			PullLists();
			handleClose();
		}
	};

	const AddNewList = async () => {
		console.log(NewListRef.current!.value);
		const NewListName = NewListRef.current!.value;

		if (user && NewListName.length > 0) {
			const UserDB = doc(db, `Users/${user.uid}/MoreInfo/Lists`);
			await updateDoc(UserDB, {
				[NewListName]: [],
			});
			// await updateDoc(UserDB, {
			// 	NewListName: arrayUnion(Item),
			// });
			console.log('Item Added To New List');
			PullLists();
			setModalLoading(true);
			setModalLoading(false);
			//handleClose();
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
					<Modal show={show} onHide={handleClose} onShow={PullLists}>
						<Modal.Header>
							<Modal.Title>
								<span>
									<h2>Add to list</h2>
									<BsPlusLg
										onClick={() => {
											setEditing(true);
										}}
									/>
								</span>
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{ModalLoading ? (
								<LoadingScreen />
							) : (
								<ListGroup defaultActiveKey="#link1">
									{Editing ? (
										<ListGroup.Item action>
											<input
												placeholder="New List Name"
												ref={NewListRef}
												className="NewListInput"
											/>
										</ListGroup.Item>
									) : (
										''
									)}
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
							<Button
								variant="secondary"
								onClick={() => {
									setEditing(false);
									handleClose();
								}}
							>
								Cancel
							</Button>
							{Editing ? (
								<Button
									variant="primary"
									onClick={() => {
										AddNewList();
										setEditing(false);
									}}
								>
									Save
								</Button>
							) : (
								''
							)}
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
