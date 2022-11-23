import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { SignIn, app } from '../../config/Firebase.js';

function SignInComponent() {
	const auth = getAuth(app);
	const [UserEmail, setUserEmail] = useState('');
	const [UserPassword, setUserPassword] = useState('');
	const navigate = useNavigate();

	const SetSignIn = (e) => {
		e.preventDefault();
		SignIn(auth, UserEmail, UserPassword).then(() => {
			navigate('/');
		});
	};

	return (
		<div className="SignInContainer">
			<h2>Sign In</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					SignIn(auth, UserEmail, UserPassword);
				}}
			>
				<input
					type="text"
					placeholder="Email"
					onChange={(e) => setUserEmail(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Password"
					onChange={(e) => setUserPassword(e.target.value)}
				/>
				<Button onClick={SetSignIn}>Sign In</Button>
				<Link to="/signup">Create account</Link>
			</form>
		</div>
	);
}

export default SignInComponent;
