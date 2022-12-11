import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/Firebase';
import LoadingScreen from '../../Pages/LoadingScreen';
import { SetUser } from '../../Store/Slices/UserSlice';

const ArrowStyle = { marginLeft: '10px' };

type Props = { Query: string };

function UserSearch({ Query }: Props) {
	const [UserSearchResults, setUserSearchResults] = useState<any[]>();
	const [Loading, setLoading] = useState<boolean>(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const GetUsers = async () => {
		const querySnapshot = await getDocs(collection(db, 'Users'));
		const FilteredUsers = querySnapshot.docs.filter((doc) => {
			return doc.data().Username.toLowerCase().includes(Query.toLowerCase());
		});
		setUserSearchResults(FilteredUsers);
	};

	const NavigateToUser = (User: string) => {
		dispatch(SetUser(User));
		navigate('/user');
	};

	useEffect(() => {
		if (Query !== null || undefined) {
			setLoading(true);
			GetUsers().then(() => setLoading(false));
		} else {
			GetUsers();
		}
	}, [Query]);

	return (
		<div>
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<div className="SearchResults">
						{UserSearchResults?.map((User: any, index: number) => {
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
									<h2 className="ConnectionUsername">{User.data().Username}</h2>
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
