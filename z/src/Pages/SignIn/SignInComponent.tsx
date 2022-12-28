import React, { useState } from 'react';
import '../../Styles/AuthPages.scss';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { SignIn, app } from '../../config/Firebase.js';
import { Box, TextField } from '@mui/material';
import { useSelector } from 'react-redux';

function SignInComponent(): any {
	const Version = useSelector((state: any) => state.VersionState);
	const auth = getAuth(app);
	const [UserEmail, setUserEmail] = useState('');
	const [UserPassword, setUserPassword] = useState('');
	const navigate = useNavigate();

	const SetSignIn = (e: any) => {
		e.preventDefault();
		SignIn(auth, UserEmail, UserPassword);
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
				onSubmit={(e) => {
					e.preventDefault();
					SignIn(auth, UserEmail, UserPassword);
				}}
			>
				<h2>Sign In</h2>
				<TextField
					id="standard-basic"
					label="Email"
					variant="standard"
					onChange={(e) => setUserEmail(e.target.value)}
				/>
				<TextField
					id="standard-basic"
					type="password"
					label="Password"
					variant="standard"
					onChange={(e) => setUserPassword(e.target.value)}
				/>
				<Button onClick={SetSignIn}>Sign In</Button>
				<Link to="/signup">Create account</Link>
				<p style={{ margin: '10px', textAlign: 'center' }}>
					App Version: v{Version.Version}
				</p>
			</Box>
		</div>
	);
}

export default SignInComponent;
