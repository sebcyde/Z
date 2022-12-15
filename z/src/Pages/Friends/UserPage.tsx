import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaArrowLeft, FaCrown, FaEllipsisH } from 'react-icons/fa';
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
	const ref = useRef();

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

	const NavigateToList = (Key: string) => {
		console.log('Navigating To List:', Key);
	};

	const SaveList = (List) => {
		console.log('Saving List');
	};

	useEffect(() => {
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
								<span className="UserDetailsAdmin">
									<p>Admin User</p>
									<FaCrown />
								</span>
							) : (
								<p>Beta Tester</p>
							)}
						</span>
					</div>
					<p className="UserDetailsList">{UserDetails.Username} Lists:</p>
					<div className="UserLists">
						{Object.keys(UserLists).map((key, index) => {
							console.log(`${key} Detail:`, UserLists[key]);
							return (
								<div key={index} className="UserList">
									<div className='UserListImageContainer'>
										<img
											src={UserLists[key][0]?.images.jpg.large_image_url}
											className="UserListImage"
										/>
									</div>
									<span>
										<h2 className="UserListTitle">{key}</h2>

										<Dropdown>
											<Dropdown.Toggle
												id="dropdown-custom-components"
												variant="secondary"
											>
												<FaEllipsisH />
											</Dropdown.Toggle>

											<Dropdown.Menu>
												<Dropdown.Item
													eventKey="1"
													onClick={() => {
														NavigateToList(key);
													}}
												>
													View List
												</Dropdown.Item>
												<Dropdown.Item
													eventKey="2"
													onClick={() => {
														SaveList(key);
													}}
												>
													Save List
												</Dropdown.Item>
												<Dropdown.Divider />
												<Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</span>
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}

export default UserPage;
