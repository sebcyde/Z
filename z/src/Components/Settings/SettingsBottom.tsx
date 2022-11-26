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
			// Add user details read only here
			<h2>There's Nothing Here Right Now!</h2>
			<p>We're still working on this bit...</p>
			<Button onClick={LogOut}>Log Out</Button>
		</div>
	);
}

export default SettingsBottom;
