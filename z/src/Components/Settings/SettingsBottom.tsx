import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Button } from 'react-bootstrap';

function SettingsBottom() {
	const auth = getAuth();
	const user = auth.currentUser;

	const LogOut = async () => {
		signOut(auth)
			.then(() => {
				console.log('Sign Out Successful');
			})
			.catch((error) => {
				console.log('Sign Out Error:', error);
			});
	};

	return (
		<div className="SettingsBottomSection">
			<div className="SettingsPageRow">
				<p>UserName</p>
				<p>{user?.displayName ? user.displayName : 'Not Set'}</p>
			</div>
			<div className="SettingsPageRow">
				<p>Name</p>
				<p>To Add To DB?</p>
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
		</div>
	);
}

export default SettingsBottom;
