import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { db } from '../../config/Firebase';
import LoadingScreen from '../../Pages/LoadingScreen';

const ArrowStyle = { marginLeft: '10px' };

type Props = { Query: string };

function UserSearch({ Query }: Props) {
	const [UserSearchResults, setUserSearchResults] = useState<any[]>();
	const [Loading, setLoading] = useState<boolean>(false);

	const GetUsers = async () => {
		const querySnapshot = await getDocs(collection(db, 'Users'));
		querySnapshot.forEach((doc) => {
			console.log(doc.id, ' => ', doc.data());
		});
		const FilteredUsers = querySnapshot.docs.filter((doc) => {
			return doc.data().Username.toLowerCase().includes(Query.toLowerCase());
		});
		setUserSearchResults(FilteredUsers);
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
					<div className="Title">
						<h3>Query: {Query}</h3>
					</div>
					<div className="SearchResults">
						{UserSearchResults?.map((User: any, index: number) => {
							console.log('User:', User);
							console.log('User Data:', User.data());
							return (
								<div key={index} className="ConnectionContainer">
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
