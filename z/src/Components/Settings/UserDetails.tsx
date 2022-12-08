import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AiOutlineRight } from 'react-icons/ai';
import defaultPicture from '../../assets/PFP/girl1.png';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase.js';
import { useNavigate } from 'react-router-dom';
import { RetrieveImage } from '../../Functions/ImageControl';

type Props = {};

function UserDetails({}: Props) {
	const [Loading, setLoading] = useState<boolean>(true);
	const [UserDetails, setUserDetails] = useState<any>();
	const [UserImage, setUserImage] = useState<string>('');
	const navigate = useNavigate();
	const auth = getAuth();
	const user = auth.currentUser;

	const PullData = async () => {
		const docRef = doc(db, `Users/${user!.uid}`);
		const docSnap = await getDoc(docRef);
		const Image = await RetrieveImage();
		setUserImage(Image);
		if (docSnap.exists()) {
			setUserDetails(docSnap.data());
			console.log('User details set');
		} else {
			console.log('No such document!');
		}
	};

	useEffect(() => {
		PullData().then(() => {
			setLoading(false);
			console.log('User Details From Auth:', auth.currentUser);
			console.log('User Details From DB:', UserDetails);
		});
	}, []);

	return (
		<div className="UserDetailsContainer">
			<img src={UserImage == null ? defaultPicture : UserImage} />
			<h2>
				{auth.currentUser?.displayName
					? auth.currentUser?.displayName
					: '"Display Name"'}
			</h2>
			<p>{auth.currentUser?.email}</p>
			<Button
				onClick={() => {
					navigate('/edit');
				}}
			>
				Edit Profile <AiOutlineRight />
			</Button>
		</div>
	);
}

export default UserDetails;
