import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase.js';
import LoadingScreen from '../../Pages/LoadingScreen';
import { FaCrown } from 'react-icons/fa';

function SettingsTop() {
	const [Loading, setLoading] = useState<boolean>(true);
	const [UserDetails, setUserDetails] = useState<any>();
	const auth = getAuth();
	const user = auth.currentUser;

	const PullData = async () => {
		// Retrieve user details from DB
		const docRef = doc(db, `Users/${user!.uid}`);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			console.log(docSnap.data());
			setUserDetails(docSnap.data());
		} else {
			console.log('Failed to retrieve user details');
		}
	};

	useEffect(() => {
		PullData().then(() => setLoading(false));
	}, []);

	return (
		<div className="UserDetailsContainer">
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<h1>My Account</h1>
					<div>
						<img src={UserDetails.DisplayPicture} />
						<span className="UserInformationContainer">
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
				</>
			)}
		</div>
	);
}

export default SettingsTop;
