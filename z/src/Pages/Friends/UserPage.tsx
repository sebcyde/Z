import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { FaArrowLeft, FaCrown, FaEllipsisH } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Follow, UnFollow } from '../../Functions/Follow';
import { SaveList } from '../../Functions/UserLists/SaveList';
import LoadingScreen from '../LoadingScreen';
import { GetUserLists } from '../../Functions/UserLists/GetUserLists';
import { GetUserData } from '../../Functions/UserDetails/GetUserData';
import { GetUserFriends } from '../../Functions/UserDetails/GetUserFriends';

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
	const auth = getAuth();
	const user = auth.currentUser;

	const PullData = async () => {
		const UserData = await GetUserData(UserQuery.UserID);
		setUserDetails(UserData);

		const UserFriends = await GetUserFriends(UserQuery.UserID);
		setUserFriends(UserFriends);

		const UserLists = await GetUserLists(UserQuery.UserID);
		setUserLists(UserLists);

		if (user) {
			const FriendsLists = await GetUserLists(user.uid);
			console.log('My Friends Lists:', FriendsLists);
			setMyFriendsList(FriendsLists);
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

	const NavigateToList = async (List: any) => {
		console.log('Navigating To List:', List);
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
						<Button className="RecoButton" onClick={() => navigate('/message')}>
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
