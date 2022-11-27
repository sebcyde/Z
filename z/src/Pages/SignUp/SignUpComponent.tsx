import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import '../../Styles/AuthPages.scss';
import { SignUp, app } from '../../config/Firebase.js';

function SignUpComponent() {
	const auth = getAuth(app);
	const [UserEmail, setUserEmail] = useState('');
	const [UserPassword, setUserPassword] = useState('');

	const SetSignUp = (e: any) => {
		e.preventDefault();
		SignUp(auth, UserEmail, UserPassword);
	};

	return (
		<div className="SignInContainer">
			<div>
				<h2>Sign Up</h2>
				<form>
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
					<Button onClick={SetSignUp}>Sign Up</Button>
					<Link to="/signin">Already have an account?</Link>
				</form>
			</div>
		</div>
	);
}

export default SignUpComponent;
