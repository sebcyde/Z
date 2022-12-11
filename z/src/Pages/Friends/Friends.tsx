import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { db } from '../../config/Firebase';
import LoadingScreen from '../LoadingScreen';

const ArrowStyle = {
	marginLeft: '10px',
};

function Friends() {
	const [SearchTerm, setSearchTerm] = useState<string>('');
	const [UserFollowers, setUserFollowers] = useState<any[]>([]);
	const [UserFollowing, setUserFollowing] = useState<any[]>([]);
	const [Loading, setLoading] = useState<boolean>(true);
	const [UserDetails, setUserDetails] = useState<any>();
	const [Results, setResults] = useState<any[]>([]);
	const [SearchType, setSearchType] = useState('following');
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

		const Following = await Promise.all(
			ConnectionsSnap.data()?.Following.map(
				async (Followed: string, index: number): Promise<any> => {
					const FollowedData = await PullConnection(Followed);
					return FollowedData;
				}
			)
		);

		const Followers = await Promise.all(
			ConnectionsSnap.data()?.Followers.map(
				async (Follower: string, index: number): Promise<any> => {
					const FollowerData = await PullConnection(Follower);
					return FollowerData;
				}
			)
		);

		setUserFollowing(Following);
		setUserFollowers(Followers);
	};

	const TabSelect = (k: string | null) => {
		setSearchType(k!);
	};

	const InputHandler = (event: any) => {
		setSearchTerm(event.target.value);
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
									placeholder="Search"
									className="SearchbarInput"
									ref={SearchInput}
									value={SearchTerm}
									onChange={debouncedHandler}
								/>

								{Results}
							</>
						) : (
							''
						)}

						{SearchType === 'following' ? (
							<>
								{UserFollowing.map((Following, index: number) => {
									return (
										<div key={index} className="ConnectionContainer">
											<img
												src={Following.DisplayPicture}
												className="ConnectionImage"
											/>

											<h2 className="ConnectionUsername">
												{Following.Username}
											</h2>
											<FaArrowRight style={ArrowStyle} />
										</div>
									);
								})}
							</>
						) : (
							''
						)}
						{SearchType === 'followers' ? (
							<>
								{UserFollowers.map((Follower, index: number) => {
									return (
										<div key={index} className="ConnectionContainer">
											<img
												src={Follower.DisplayPicture}
												className="ConnectionImage"
											/>

											<h2 className="ConnectionUsername">
												{Follower.Username}
											</h2>
											<FaArrowRight style={ArrowStyle} />
										</div>
									);
								})}
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
