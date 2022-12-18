import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import '../../Styles/AuthPages.scss';
import { SignUp, app } from '../../config/Firebase.js';
import { Box, TextField } from '@mui/material';

function SignUpComponent() {
	const auth = getAuth(app);
	const [UserEmail, setUserEmail] = useState('');
	const [Username, setUsername] = useState('');
	const [UserPassword, setUserPassword] = useState('');

	const SetSignUp = (e: any) => {
		e.preventDefault();
		SignUp(auth, UserEmail, UserPassword, Username);
	};

	return (
		<div className="AuthPage">
			<Box
				component="form"
				sx={{
					'& > :not(style)': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete="off"
				className="AuthContainer"
			>
				<h2>Sign Up</h2>
				<TextField
					id="standard-basic"
					label="Username"
					variant="standard"
					onChange={(e) => setUsername(e.target.value)}
				/>
				<TextField
					id="standard-basic"
					label="Email"
					variant="standard"
					onChange={(e) => setUserEmail(e.target.value)}
				/>
				<TextField
					id="standard-basic"
					label="Password"
					variant="standard"
					onChange={(e) => setUserPassword(e.target.value)}
				/>
				<Button onClick={SetSignUp}>Sign Up</Button>
				<Link to="/signin">Already have an account?</Link>
			</Box>
		</div>
	);
}

export default SignUpComponent;
