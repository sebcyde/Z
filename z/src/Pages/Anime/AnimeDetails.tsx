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
import { LoadingButton } from '@mui/lab';
import { Rating } from '@mui/material';

type Props = {};

function AnimeDetails({}: Props) {
	const StoreID = useSelector((state: any) => state.IDState);
	const [ButtonLoading, setButtonLoading] = useState(false);
	const [AnimeData, setAnimeData] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);
	const [ModalLoading, setModalLoading] = useState<boolean>(true);
	const [UserLists, setUserLists] = useState<any[]>([]);
	const [InList, setInList] = useState<boolean>(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const [Editing, setEditing] = useState<boolean>(false);
	const NewListRef = useRef<HTMLInputElement>(null);
	const auth = getAuth();
	const user = auth.currentUser;

	const handleClose = () => {
		setShow(false);
		setButtonLoading(false);
	};
	const handleShow = () => {
		setButtonLoading(true);
		setShow(true);
	};

	const ResetID = () => {
		dispatch(Update(0));
		navigate('/');
	};

	const PullLists = async () => {
		setModalLoading(true);

		if (user) {
			const docRef = doc(db, `Users/${user.uid}/MoreInfo/Lists`);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const Lists = docSnap.data();

				const sorted = Object.keys(Lists!)
					.sort()
					.reduce((accumulator: any, key) => {
						accumulator[key] = Lists![key];
						return accumulator;
					}, {});
				console.log('Sorted:', sorted);

				console.log('Lists:', sorted);
				setUserLists(Object.keys(sorted));
				setModalLoading(false);
			} else {
				console.log('No such document!');
			}
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
			setModalLoading(true);
			console.log('Item Added To:', NewListName);
			PullLists();
			setModalLoading(false);
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
				console.log('Anime Data:', Data);
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
					<Modal
						show={show}
						onHide={handleClose}
						onShow={PullLists}
						centered={true}
					>
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
						<h2
							className="AnimeTitle "
							style={AnimeData.score ? undefined : { marginBottom: '15px' }}
						>
							{AnimeData.title}
						</h2>
						{AnimeData.score ? (
							<>
								<span className="AnimeRating">
									<Rating
										name="half-rating-read"
										value={AnimeData.score / 2}
										precision={0.1}
										readOnly
									/>
									<p>Average: {AnimeData.score}</p>
								</span>
							</>
						) : (
							''
						)}

						<LoadingButton
							loading={ButtonLoading}
							variant="outlined"
							onClick={handleShow}
						>
							<span className="material-symbols-outlined">
								playlist_add_check
							</span>
							<p>Add To MyList</p>
						</LoadingButton>

						{AnimeData.airing == false &&
						AnimeData.status === 'Not yet aired' ? (
							<p
								className="AnimeSynopsis"
								style={{ margin: '15px 0px 0px 15px' }}
							>
								{AnimeData.status}
							</p>
						) : (
							''
						)}

						<p className="AnimeSynopsis">{AnimeData.synopsis}</p>
					</div>
					{AnimeData.trailer.youtube_id ? (
						<YouTubeEmbed ID={AnimeData.trailer.youtube_id} />
					) : (
						''
					)}

					<SimilarBanner Genres={AnimeData.genres} Title={AnimeData.title} />
				</>
			)}

			{user && user.uid === 'oiE27ZlECvbU5MhKPjVPRQpiMSp1' ? (
				<>
					<Button onClick={ResetID}>Reset ID</Button>
				</>
			) : (
				''
			)}
		</div>
	);
}

export default AnimeDetails;
