import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { FaArrowRight, FaCrown } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserSearch from '../../Components/Messages/UserSearch';
import { db } from '../../config/Firebase';
import { SetUser } from '../../Store/Slices/UserSlice';
import LoadingScreen from '../LoadingScreen';

const ArrowStyle = {
	marginLeft: '10px',
};

type UserConnections = {
	Following: string[];
	Followers: string[];
};

function Friends() {
	const [SearchTerm, setSearchTerm] = useState<string>('');
	const [UserFollowers, setUserFollowers] = useState<any[]>([]);
	const [UserFollowing, setUserFollowing] = useState<any[]>([]);
	const [Loading, setLoading] = useState<boolean>(true);
	const [UserDetails, setUserDetails] = useState<any>();
	const [SearchType, setSearchType] = useState('following');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const SearchInput = useRef(null);
	const auth = getAuth();
	const user = auth.currentUser;

	const PullConnection = async (UID: string) => {
		// Retrieve connection details from DB
		const docRef = doc(db, `Users/${UID}`);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return docSnap.data();
		} else {
			console.log(`Failed to retrieve details for user: ${UID}`);
		}
	};

	const PullData = async () => {
		// Retrieve user details from DB
		const docRef = doc(db, `Users/${user!.uid}`);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			console.log('My Details:', docSnap.data());
			setUserDetails(docSnap.data());
		} else {
			console.log('Failed to retrieve user details');
		}

		const ConnectionsRef = doc(db, `Users/${user!.uid}/MoreInfo/Friends`);
		const ConnectionsSnap = await getDoc(ConnectionsRef);

		console.log('My Connectons:', ConnectionsSnap.data());

		// Retrieve and set following and followers data
		const [following, followers] = await Promise.all([
			Promise.all(
				ConnectionsSnap.data()?.Following.map(
					async (followed: string) => await PullConnection(followed)
				)
			),
			Promise.all(
				ConnectionsSnap.data()?.Followers.map(
					async (follower: string) => await PullConnection(follower)
				)
			),
		]);
		setUserFollowing(following);
		setUserFollowers(followers);
	};

	const TabSelect = (k: string | null) => {
		setSearchType(k!);
		setSearchTerm('');
	};

	const InputHandler = (event: any) => {
		setSearchTerm(event.target.value);
	};

	const NavigateToUser = (User: string) => {
		dispatch(SetUser(User));
		navigate('/user');
	};

	const debouncedHandler = useCallback(debounce(InputHandler, 1000), []);

	useEffect(() => {
		PullData().then(() => setLoading(false));
	}, []);

	return (
		<div className="FriendsContainer">
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<div className="TopSection">
						<span className="UserDetails">
							<img src={UserDetails.DisplayPicture} />
							<p>{UserDetails.Username}</p>
						</span>

						<span>
							<h2>{UserFollowers.length}</h2>
							<h3>Followers</h3>
						</span>
						<span>
							<h2>{UserFollowing.length}</h2>
							<h3>Following</h3>
						</span>
					</div>
					<div className="BottomSection">
						<Tabs
							defaultActiveKey="following"
							id="tabParent"
							className="mb-3"
							onSelect={TabSelect}
						>
							<Tab eventKey="following" title="Following" />
							<Tab eventKey="followers" title="Followers" />
							<Tab eventKey="search" title="Search" />
						</Tabs>
						{SearchType === 'search' ? (
							<>
								<input
									placeholder="Search Usernames"
									className="SearchbarInput"
									ref={SearchInput}
									// value={SearchTerm}
									onChange={debouncedHandler}
								/>

								<UserSearch Query={SearchTerm} />
							</>
						) : (
							''
						)}

						{SearchType === 'following' ? (
							<>
								{UserFollowing.length > 0 ? (
									<>
										{UserFollowing.map((Following, index: number) => {
											return (
												<div
													key={index}
													className="ConnectionContainer"
													onClick={() => {
														NavigateToUser(Following.UID);
													}}
												>
													<img
														src={Following.DisplayPicture}
														className="ConnectionImage"
													/>

													<div className="ConnectionDetailsContainer">
														<span>
															<h2 className="ConnectionAdmin">
																{Following.Admin ? <FaCrown /> : ''}
															</h2>
															<h2 className="ConnectionUsername">
																{Following.Username}
															</h2>
														</span>
													</div>
													<FaArrowRight style={ArrowStyle} />
												</div>
											);
										})}
									</>
								) : (
									<h2>You're not following anyone</h2>
								)}
							</>
						) : (
							''
						)}
						{SearchType === 'followers' ? (
							<>
								{UserFollowers.length > 0 ? (
									<>
										{UserFollowers.map((Follower, index: number) => {
											return (
												<div
													key={index}
													className="ConnectionContainer"
													onClick={() => {
														NavigateToUser(Follower.UID);
													}}
												>
													<img
														src={Follower.DisplayPicture}
														className="ConnectionImage"
													/>

													<div className="ConnectionDetailsContainer">
														<span>
															<h2 className="ConnectionAdmin">
																{Follower.Admin ? <FaCrown /> : ''}
															</h2>
															<h2 className="ConnectionUsername">
																{Follower.Username}
															</h2>
														</span>
													</div>
													<FaArrowRight style={ArrowStyle} />
												</div>
											);
										})}
									</>
								) : (
									<h2>You don't have any followers yet</h2>
								)}
							</>
						) : (
							''
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default Friends;
