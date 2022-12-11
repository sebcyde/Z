import React, { useEffect, useState } from 'react';
import {
	getAuth,
	signOut,
	reauthenticateWithCredential,
	EmailAuthProvider,
} from 'firebase/auth';
import { Button, Modal } from 'react-bootstrap';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import LoadingScreen from '../../Pages/LoadingScreen';
import { capitalizeFirstLetter } from '../../Functions/Capitalise';
import { FaArrowRight, FaSignOutAlt, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ImageUpload } from '../../Functions/ImageControl';
import { DeleteAccount } from '../../Functions/EditDetails';

const ArrowStyle = {
	marginLeft: '10px',
};

function SettingsBottom() {
	const [ShowError, setShowError] = useState<boolean>(false);
	const [UserDetails, setUserDetails] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);
	const [showReAuth, setshowReAuth] = useState(false);
	const handleReAuthClose = () => setshowReAuth(false);
	const handleReAuthShow = () => setshowReAuth(true);
	const [UserPassword, setUserPassword] = useState('');
	const [UserEmail, setUserEmail] = useState('');
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const navigate = useNavigate();
	const auth = getAuth();
	const user = auth.currentUser;

	const PullData = async () => {
		// Retrieve user details from DB
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

	const OpenAuthModal = () => {
		handleClose();
		handleReAuthShow();
	};

	const Reauthenticate = async () => {
		if (user) {
			setLoading(true);
			// Check login Details
			const authCredential = EmailAuthProvider.credential(
				UserEmail,
				UserPassword
			);

			reauthenticateWithCredential(user, authCredential)
				.then(() => {
					console.log('Reauthentication successful');
					if (ShowError) setShowError(false);
					handleReAuthClose();
					// Delete Account
					DeleteAccount(user);
				})
				.then(() => {
					setLoading(false);
				})
				.catch((error) => {
					setShowError(true);
					console.log('An error occured while reauthenticating.');
					console.log(`Error ${error.code}: ${error.message}`);
					setLoading(false);
				});
		}
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
					<div className="SettingsPageSection">
						<h2 className="SettingsPageTitle">Update Profile</h2>
						<div className="SettingsPageRow">
							<a
								className="BottomA"
								onClick={() => {
									navigate('/edit/userimage');
								}}
							>
								<p>Change Display Picture</p>
								<p>
									<FaArrowRight style={ArrowStyle} />
								</p>
							</a>
						</div>
						<div className="SettingsPageRow">
							<p>Change Username</p>
							<a
								onClick={() => {
									navigate('/edit/username');
								}}
							>
								<p>
									{UserDetails?.Username}
									<FaArrowRight style={ArrowStyle} />
								</p>
							</a>
						</div>
						<div className="SettingsPageRow">
							<p>Change Email</p>
							<a
								onClick={() => {
									navigate('/edit/useremail');
								}}
							>
								<p>
									{user?.email}
									<FaArrowRight style={ArrowStyle} />
								</p>
							</a>
						</div>
					</div>

					<div className="SettingsPageSection">
						<h2 className="SettingsPageTitle">Account Details</h2>
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
					</div>

					<div className="SettingsPageSection">
						<h2 className="SettingsPageTitle">More Options</h2>
						<div className="SettingsPageRow">
							<a className="BottomA" onClick={handleShow}>
								<p>Delete Account</p>
								<p>
									<FaTrashAlt />
								</p>
							</a>
						</div>
						<div className="SettingsPageRow">
							<a className="BottomA" onClick={LogOut}>
								<p>Log Out</p>
								<p>
									<FaSignOutAlt />
								</p>
							</a>
						</div>
					</div>
					<div>
						<p>App Version 1.1</p>
					</div>
					<Modal show={show} onHide={handleClose} centered>
						<Modal.Header closeButton>
							<Modal.Title>Confirm Account Deletion</Modal.Title>
						</Modal.Header>
						<Modal.Body>This cannot be reversed. Are you sure?</Modal.Body>
						<Modal.Footer>
							<Button variant="primary" onClick={handleClose}>
								Cancel
							</Button>
							<Button variant="danger" onClick={OpenAuthModal}>
								Delete Account
							</Button>
						</Modal.Footer>
					</Modal>

					<Modal show={showReAuth} onHide={handleReAuthClose} centered>
						<Modal.Header closeButton>
							<Modal.Title>Reauthenticate Account</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<input
								type="text"
								placeholder="Email"
								onChange={(e) => setUserEmail(e.target.value)}
							/>
							<input
								type="password"
								placeholder="Password"
								onChange={(e) => setUserPassword(e.target.value)}
							/>
							{ShowError ? (
								<p
									style={{
										color: 'red',
										textAlign: 'center',
										marginTop: '10px',
										marginBottom: '0px',
									}}
								>
									Incorrect Credentials
								</p>
							) : (
								''
							)}
						</Modal.Body>
						<Modal.Footer>
							<Button variant="primary" onClick={handleReAuthClose}>
								Cancel
							</Button>
							<Button variant="danger" onClick={Reauthenticate}>
								Delete Account
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			)}
		</div>
	);
}

export default SettingsBottom;
