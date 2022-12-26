import { collection, doc, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaCrown } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app, auth, db } from '../../config/Firebase';
import LoadingScreen from '../../Pages/LoadingScreen';
import { SetUser } from '../../Store/Slices/UserSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
	useCollection,
	useDocument,
	useDocumentData,
} from 'react-firebase-hooks/firestore';

const ArrowStyle = { marginLeft: '10px' };

type Props = { Query: string | undefined };

function UserSearch({ Query }: Props) {
	const [UserSearchResults, setUserSearchResults] = useState<any[]>();
	const [user] = useAuthState(auth);
	const [value, loading, error] = useDocument(
		doc(getFirestore(app), `Users/${user?.uid}`)
	);
	const [Loading, setLoading] = useState<boolean>(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const GetUsers = async () => {
		const querySnapshot = await getDocs(collection(db, 'Users'));
		const FilteredUsers = querySnapshot.docs.filter((doc) => {
			return doc.data().Username.toLowerCase().includes(Query!.toLowerCase());
		});

		setUserSearchResults(FilteredUsers);
	};

	const GetAllUsers = async () => {
		const querySnapshot = await getDocs(collection(db, 'Users'));

		const FilteredUsers = querySnapshot.docs;
		setUserSearchResults(FilteredUsers);
	};

	const NavigateToUser = (User: string) => {
		dispatch(SetUser(User));
		navigate('/message');
	};

	useEffect(() => {
		if (Query !== undefined) {
			setLoading(true);
			GetUsers().then(() => setLoading(false));
		} else {
			setLoading(true);
			GetAllUsers().then(() => setLoading(false));
		}
	}, [Query]);

	return (
		<div>
			{Loading || !value ? (
				<LoadingScreen />
			) : (
				<>
					<div className="SearchResults">
						{UserSearchResults?.filter((doc) => {
							return (
								doc.data().Username.toLowerCase() !=
								value?.data()?.Username.toLowerCase()
							);
						}).map((User: any, index: number) => {
							return (
								<div
									key={index}
									className="ConnectionContainer"
									onClick={() => {
										NavigateToUser(User.data().UID);
									}}
								>
									<img
										src={User.data().DisplayPicture}
										className="ConnectionImage"
									/>
									<div className="ConnectionDetailsContainer">
										<span>
											<h2 className="ConnectionAdmin">
												{User.data().Admin ? <FaCrown /> : ''}
											</h2>
											<h2 className="ConnectionUsername">
												{User.data().Username}
											</h2>
										</span>
									</div>

									<FaArrowRight style={ArrowStyle} />
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}

export default UserSearch;
