import React, { useEffect, useState } from 'react';
import {
	deleteField,
	doc,
	getDoc,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../../config/Firebase.js';
import { getAuth } from 'firebase/auth';
import LoadingScreen from '../LoadingScreen';
import { useDispatch } from 'react-redux';
import { Update } from '../../Store/Slices/AnimeSlice.js';
import { BsPlusLg, BsThreeDots } from 'react-icons/bs';
import { Button, ListGroup, Modal } from 'react-bootstrap';
import { AiOutlinePlus } from 'react-icons/ai';
import { SassString } from 'sass';

function MyLists() {
	const [Loading, setLoading] = useState<boolean>(true);
	const [UserLists, setUserLists] = useState<any[]>([]);
	const [Loading2, setLoading2] = useState<boolean>(true);
	const [SelectedList, setSelectedList] = useState<string>('');
	const [ModalLoading, setModalLoading] = useState<boolean>(true);
	const [Editing, setEditing] = useState<boolean>(false);
	const [NewListRef, setNewListRef] = useState<SassString>('');
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [show2, setShow2] = useState(false);
	const auth = getAuth();
	const user = auth.currentUser;

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleClose2 = () => setShow2(false);
	const handleShow2 = () => setShow2(true);

	const handleInputChange = (event: any) => {
		setNewListRef(event?.target.value);
	};

	const DeleteList = async (ListName: string) => {
		console.log('Deleting', ListName);
		setLoading(true);
		const DocRef = doc(db, `Users/${user!.uid}/MoreInfo`, 'Lists');
		if (ListName == 'Favourites') {
			// reset to empty but dont delete
			await setDoc(DocRef, { Favourites: [] }, { merge: true });
			Startup();
		} else {
			// delete user made
			await updateDoc(DocRef, {
				[ListName]: deleteField(),
			});
			Startup();
		}
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	};

	const NavigateAnimePage = async (ID: number) => {
		dispatch(Update(ID));
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
					.reduce((accumulator, key) => {
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

	const AddNewList = async () => {
		console.log(NewListRef);
		const NewListName = NewListRef.toString();

		if (user && NewListName.length > 0) {
			const UserDB = doc(db, `Users/${user.uid}/MoreInfo/Lists`);
			await updateDoc(UserDB, {
				[NewListName.toString()]: [],
			});

			setEditing(false);
			setNewListRef('');
			console.log('Item Added To:', NewListName);
			handleClose2();
			Startup();
		}
	};

	const PullFavourites = async () => {
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

	const Startup = () => {
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
	};

	useEffect(() => {
		Startup();
	}, []);

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<Modal
				show={show2}
				onHide={handleClose2}
				onShow={PullLists}
				centered={true}
			>
				<Modal.Header>
					<Modal.Title>
						<span>
							<h2>Create New List</h2>
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
										className="NewListInput"
										onChange={handleInputChange}
										value={NewListRef}
									/>
								</ListGroup.Item>
							) : (
								''
							)}
							{UserLists.map((list, index: number) => {
								return (
									<ListGroup.Item action key={index}>
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
							handleClose2();
							Startup();
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

			<Modal show={show} onHide={handleClose} centered={true}>
				<Modal.Header>
					<Modal.Title id="contained-modal-title-vcenter">
						{SelectedList}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>What should we do with this list?</Modal.Body>
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
			<div
				style={{
					marginTop: '20px',
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Button className="Button" onClick={handleShow2}>
					Create New List <AiOutlinePlus />
				</Button>
			</div>
		</div>
	);
}

export default MyLists;
