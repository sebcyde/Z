import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase.js';
import { getAuth } from 'firebase/auth';
import LoadingScreen from '../LoadingScreen';
import { useDispatch } from 'react-redux';
import { Update } from '../../Store/Slices/AnimeSlice.js';
import { BsThreeDots } from 'react-icons/bs';
import { Button, Modal } from 'react-bootstrap';

function MyLists() {
	const [Loading, setLoading] = useState<boolean>(true);
	const [UserLists, setUserLists] = useState<any[]>([]);
	const [Loading2, setLoading2] = useState<boolean>(true);
	const [SelectedList, setSelectedList] = useState<string>('');
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const DeleteList = (ListName: string) => {
		if (ListName == 'Favourites') {
			// reset to empty but dont delete
		} else {
			// delete user made
		}
	};

	const NavigateAnimePage = async (ID: number) => {
		dispatch(Update(ID));
	};

	const PullFavourites = async () => {
		const auth = getAuth();
		const user = auth.currentUser;
		if (user) {
			const docRef = doc(db, `Users/${user.uid}/MoreInfo`, 'Lists');
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				return data;
			} else {
				console.log('No such document!');
			}
		}
	};
	useEffect(() => {
		PullFavourites()
			.then((data) => {
				const sorted = Object.keys(data!)
					.sort()
					.reduce((accumulator, key) => {
						accumulator[key] = data![key];
						return accumulator;
					}, {});
				console.log('Sorted:', sorted);
				return sorted;
			})
			.then((data) => {
				setLoading2(false);
				const ListNames = Object.keys(data!);
				const ListValues: any = Object.values(data!);
				setUserLists(
					ListNames.map((List: string, index: number) => {
						return (
							<div className="ListContainer" key={index}>
								<span className="TitleContainer">
									<h2 className="ListTitle">{List}</h2>{' '}
									<BsThreeDots
										onClick={() => {
											setSelectedList(List);
											handleShow();
										}}
									/>
								</span>

								<div className="ListItemContainer">
									{ListValues[index].map((ListValue: any, index2: number) => {
										return (
											<div
												key={index2}
												className="AnimeListContainer"
												onClick={() => {
													NavigateAnimePage(ListValue.mal_id);
												}}
											>
												<div>
													<img src={ListValue.images.jpg.image_url} />
													<div className="AnimeListDetailsContainer">
														<h3 className="AnimeListTitle">
															{ListValue.title}
														</h3>
														<span className="AnimeListGenres">
															<p>{ListValue.genres[0].name}</p>
															<p>{ListValue.genres[1].name}</p>
														</span>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						);
					})
				);
			})
			.then(() => {
				setLoading(false);
			});
	}, []);

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<Modal
				show={show}
				onHide={handleClose}
				onShow={() => {
					console.log(SelectedList);
				}}
			>
				<Modal.Header closeButton>
					<Modal.Title>{SelectedList}</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button
						variant="danger"
						onClick={() => {
							DeleteList(SelectedList);
							handleClose();
						}}
					>
						Delete List
					</Button>
				</Modal.Footer>
			</Modal>
			{Loading ? <LoadingScreen /> : <>{UserLists.map((List) => List)}</>}
		</div>
	);
}

export default MyLists;
