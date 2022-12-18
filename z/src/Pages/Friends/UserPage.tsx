import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState, useRef } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { FaArrowLeft, FaCrown, FaEllipsisH } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/Firebase';
import { Follow, UnFollow } from '../../Functions/Follow';
import { NavigateToList } from '../../Functions/NavigateToList';
import { Recommend } from '../../Functions/Recommend';
import { SaveList } from '../../Functions/SaveList';
import LoadingScreen from '../LoadingScreen';

type Props = {};
const ArrowStyle = { marginRight: '10px' };

function UserPage({}: Props) {
	const [MyFriendsList, setMyFriendsList] = useState<any>();
	const [UserFriends, setUserFriends] = useState<any>();
	const UserQuery = useSelector((state: any) => state.UserState);
	const [UserDetails, setUserDetails] = useState<any>();
	const [UserLists, setUserLists] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();
	const ref = useRef();
	const auth = getAuth();
	const user = auth.currentUser;

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

		const UserConnectionsRef = doc(
			db,
			`Users/${UserQuery.UserID}/MoreInfo/Friends`
		);
		const UserConnectionsSnap = await getDoc(UserConnectionsRef);
		if (UserConnectionsSnap.exists()) {
			console.log('User Friends:', UserConnectionsSnap.data());
			setUserFriends(UserConnectionsSnap.data());
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

		const MyFriendsRef = doc(db, `Users/${user?.uid}/MoreInfo/Friends`);
		const MyFriendsSnap = await getDoc(MyFriendsRef);
		if (MyFriendsSnap.exists()) {
			console.log('My Friends Lists:', MyFriendsSnap.data());
			setMyFriendsList(MyFriendsSnap.data());
		} else {
			console.log('Failed to retrieve user lists');
		}
	};

	const F = async () => {
		setLoading(true);
		await Follow(UserDetails);
		await PullData();
		setLoading(false);
	};

	const UF = async () => {
		setLoading(true);
		await UnFollow(UserDetails);
		await PullData();
		setLoading(false);
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
							<span className="UserDetailsAdmin">
								<p>Followers: {UserFriends.Followers.length}</p>
							</span>
						</span>
					</div>
					<span className="UserDetailsButtonContainer">
						<>
							{user?.uid === UserDetails.UID ? (
								''
							) : MyFriendsList.Following.includes(UserDetails.UID) ? (
								<Button className="UnfollowButton" onClick={UF}>
									Unfollow
								</Button>
							) : (
								<Button className="FollowButton" onClick={F}>
									Follow
								</Button>
							)}
						</>
						<Button
							className="RecoButton"
							onClick={() => navigate('/recommend')}
						>
							Message
						</Button>
					</span>
					<p className="UserDetailsList">{UserDetails.Username} Lists:</p>
					<div className="UserLists">
						{Object.keys(UserLists).map((key, index) => {
							return (
								<div key={index} className="UserList">
									<div className="UserListImageContainer">
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
													eventKey="2"
													onClick={() => {
														NavigateToList(UserLists[key]);
													}}
												>
													View {key}
												</Dropdown.Item>
												<Dropdown.Item
													eventKey="3"
													onClick={() => {
														SaveList(UserLists[key], key);
													}}
												>
													Save {key}
												</Dropdown.Item>
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
