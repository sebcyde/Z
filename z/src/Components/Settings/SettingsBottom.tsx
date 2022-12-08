import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Button } from 'react-bootstrap';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import LoadingScreen from '../../Pages/LoadingScreen';

function SettingsBottom() {
	const [UserDetails, setUserDetails] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);
	const auth = getAuth();
	const user = auth.currentUser;

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	const PullData = async () => {
		// Retrieve user details
		const docRef = doc(db, `Users/${user!.uid}`);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			console.log(docSnap.data());
			setUserDetails(docSnap.data());
		} else {
			console.log('Failed to retrieve user details');
		}
	};

	const LogOut = async () => {
		signOut(auth)
			.then(() => {
				console.log('Sign Out Successful');
			})
			.catch((error) => {
				console.log('Sign Out Error:', error);
			});
	};

	useEffect(() => {
		PullData().then(() => setLoading(false));
	}, []);

	return (
		<div className="SettingsBottomSection">
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<div className="SettingsPageRow">
						<p>Admin</p>
						<p>{capitalizeFirstLetter(UserDetails.Admin.toString())}</p>
					</div>
					<div className="SettingsPageRow">
						<p>Email</p>
						<p>{user?.email}</p>
					</div>
					<div className="SettingsPageRow">
						<p>Phone Number</p>
						<p>{user?.phoneNumber ? user.phoneNumber : 'Not Set'}</p>
					</div>
					<div className="SettingsPageRow">
						<p>Verified Email</p>
						<p>{user?.emailVerified ? 'Verified' : 'Not Verified'}</p>
					</div>
					<div className="SettingsPageRow">
						<p>Account Creation</p>
						<p>{user?.metadata.creationTime}</p>
					</div>
					<div className="SettingsPageRow">
						<p>Last Sign In</p>
						<p>{user?.metadata.lastSignInTime}</p>
					</div>
					<div className="SettingsPageRow">
						<p>User ID</p>
						<p>{user?.uid}</p>
					</div>

					<Button onClick={LogOut}>Log Out</Button>
				</>
			)}
		</div>
	);
}

export default SettingsBottom;
