import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Button } from 'react-bootstrap';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import LoadingScreen from '../../Pages/LoadingScreen';
import { capitalizeFirstLetter } from '../../Functions/Capitalise';
import { FaArrowRight, FaSignOutAlt, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ImageUpload } from '../../Functions/ImageControl';

const ArrowStyle = {
	marginLeft: '10px',
};

function SettingsBottom() {
	const [UserDetails, setUserDetails] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);
	const [UserImage, setUserImage] = useState<File>();
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

	const UpdateDetails = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		if (UserImage != undefined) {
			ImageUpload(auth.currentUser, UserImage);
		}
		setLoading(false);
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
									navigate('/editUserImage');
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
									navigate('/editUserName');
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
									navigate('/editUserEmail');
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
							<a className="BottomA" onClick={LogOut}>
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
				</>
			)}
		</div>
	);
}

export default SettingsBottom;
