import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaCrown } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/Firebase';
import LoadingScreen from '../LoadingScreen';

type Props = {};
const ArrowStyle = { marginRight: '10px' };

function UserPage({}: Props) {
	const UserQuery = useSelector((state: any) => state.UserState);
	const [UserDetails, setUserDetails] = useState<any>();
	const [UserLists, setUserLists] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	const PullData = async () => {
		// Retrieve user details from DB
		const docRef = doc(db, `Users/${UserQuery.UserID}`);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			console.log('User Details:', docSnap.data());
			setUserDetails(docSnap.data());
		} else {
			console.log('Failed to retrieve user details');
		}

		const ListsRef = doc(db, `Users/${UserQuery.UserID}/MoreInfo/Lists`);
		const ListsSnap = await getDoc(ListsRef);
		if (ListsSnap.exists()) {
			console.log('User Lists:', ListsSnap.data());
			setUserLists(ListsSnap.data());
		} else {
			console.log('Failed to retrieve user lists');
		}
	};

	useEffect(() => {
		console.log(UserQuery);

		PullData().then(() => setLoading(false));
	}, []);

	return (
		<div className="UserPageContainer">
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<div className="Navigation">
						<span
							style={{
								display: 'flex',
								alignItems: 'center',
							}}
							onClick={() => navigate('/friends')}
						>
							<FaArrowLeft style={ArrowStyle} />
							<p>Back</p>
						</span>
					</div>
					<div className="UserDetails">
						<img src={UserDetails.DisplayPicture} />
						<span>
							<h2>{UserDetails.Username}</h2>
							{UserDetails.Admin ? (
								<span>
									<p>Admin User</p>
									<FaCrown />
								</span>
							) : (
								<p>Beta Tester</p>
							)}
						</span>
					</div>
					<div className="UserLists">
						<h2
							style={{
								width: '100%',
								margin: '20px auto',
								marginBottom: '10px',
								textAlign: 'center',
							}}
						>
							{UserDetails.Username} Lists:
						</h2>
						{Object.keys(UserLists).map((key, index) => {
							return (
								<div key={index} style={{ width: '95%', margin: '0 auto' }}>
									<h2>{key}</h2>
									<hr />
								</div>
							);
						})}

						{/* {UserLists.Favourites.length > 0 ? (
							<>
								<h2
									style={{
										width: '100%',
										margin: '20px auto',
										marginBottom: '5px',
										textAlign: 'center',
									}}
								>
									{UserDetails.Username} Lists:
								</h2>
								{UserLists.Favourites.map((Item: any, index: number) => {
									return <h3 key={index}>{Item.title}</h3>;
								})}
							</>
						) : (
							<>
								<h2
									style={{
										width: '100%',
										margin: '20px auto',
										marginBottom: '5px',
										textAlign: 'center',
									}}
								>
									{UserDetails.Username} has no lists yet :(
								</h2>
								<p
									style={{
										textAlign: 'center',
									}}
								>
									Check back later
								</p>
							</>
						)} */}
					</div>
				</>
			)}
		</div>
	);
}

export default UserPage;
