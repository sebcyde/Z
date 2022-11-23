import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Button } from 'react-bootstrap';

type Props = {};

function Settings({}: Props) {
	const auth = getAuth();

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
		<div>
			<h2>Settings</h2>
			<Button onClick={LogOut}>Log Out</Button>
		</div>
	);
}

export default Settings;
