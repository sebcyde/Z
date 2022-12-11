import { getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { Button, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UpdateDisplayName } from '../../../Functions/EditDetails';
import LoadingScreen from '../../LoadingScreen';

type Props = {};

function UserName({}: Props) {
	const [Loading, setLoading] = useState<boolean>(false);
	const [ShowError, setShowError] = useState<boolean>(false);
	const [UN1, setUN1] = useState('');
	const [UN2, setUN2] = useState('');
	const navigate = useNavigate();
	const auth = getAuth();
	const user = auth.currentUser;

	const ChangeUsername = async () => {
		setLoading(true);
		setUN1('');
		setUN2('');
		if (UN1 === UN2) {
			await UpdateDisplayName(user, UN1);
			navigate('/settings');
		} else {
			setShowError(true);
		}
		setLoading(false);
		if (ShowError) setShowError(false);
	};

	return (
		<div className="NewUsernameContainer">
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<h2>Update Username</h2>
					<div>
						<p>New Username</p>
						<input
							placeholder="Username"
							onChange={(e) => setUN1(e.target.value)}
							value={UN1}
						></input>
					</div>
					<div>
						<p>Confirm New Username</p>
						<input
							placeholder="Username"
							onChange={(e) => setUN2(e.target.value)}
							value={UN2}
						></input>
					</div>
					{ShowError ? (
						<p className="error">Update failure: Passwords don't match.</p>
					) : (
						''
					)}
					<span>
						<Button variant="danger" onClick={() => navigate('/settings')}>
							Cancel
						</Button>
						<Button variant="primary" onClick={ChangeUsername}>
							Save
						</Button>
					</span>
				</>
			)}
		</div>
	);
}

export default UserName;
