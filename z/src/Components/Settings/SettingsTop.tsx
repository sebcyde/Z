import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AiOutlineRight } from 'react-icons/ai';
import defaultPicture from '../../assets/PFP/girl1.png';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase.js';
import { useNavigate } from 'react-router-dom';
import {
	DefaultImageUpload,
	RetrieveImage,
} from '../../Functions/ImageControl';
import LoadingScreen from '../../Pages/LoadingScreen';
import { FaCrown } from 'react-icons/fa';

type UserAuthObject = {
	CreationDate: string;
	UserEmail: string;
	Username: string;
	DisplayPicture: string;
	UID: string;
	Admin: boolean;
};

function SettingsTop() {
	const [Loading, setLoading] = useState<boolean>(true);
	const [UserDetails, setUserDetails] = useState<any>();
	const [UserImage, setUserImage] = useState<string>(defaultPicture);
	const navigate = useNavigate();
	const auth = getAuth();
	const user = auth.currentUser;

	const PullData = async () => {
		// Doesn't work for default image?
		// const Image = await RetrieveImage(user);
		// setUserImage(Image);

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

	useEffect(() => {
		PullData().then(() => setLoading(false));
	}, []);

	return (
		<div className="UserDetailsContainer">
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<img src={UserImage} />
					<span className="UserInformationContainer">
						<h2>
							{UserDetails.Username}
							{UserDetails.Admin ? <FaCrown /> : ''}
						</h2>
						<p>{auth.currentUser?.email}</p>
					</span>
				</>
			)}
		</div>
	);
}

export default SettingsTop;
