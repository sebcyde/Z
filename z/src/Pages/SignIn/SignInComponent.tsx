import React, { useState } from 'react';
import '../../Styles/AuthPages.scss';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { SignIn, app } from '../../config/Firebase.js';

function SignInComponent(): any {
	const auth = getAuth(app);
	const [UserEmail, setUserEmail] = useState('');
	const [UserPassword, setUserPassword] = useState('');
	const navigate = useNavigate();

	const SetSignIn = (e: any) => {
		e.preventDefault();
		SignIn(auth, UserEmail, UserPassword);
	};

	return (
		<div className="SignInContainer">
			<div>
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
		</div>
	);
}

export default SignInComponent;
