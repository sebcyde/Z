import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { db } from '../../../config/Firebase';
import LoadingScreen from '../../LoadingScreen';
import Image1 from '../../../assets/PFP/boy1.jpg';
import Image2 from '../../../assets/PFP/boy2.jpg';
import Image3 from '../../../assets/PFP/boy3.jpg';
import Image4 from '../../../assets/PFP/boy5.jpg';
import Image5 from '../../../assets/PFP/boy6.jpg';
import Image6 from '../../../assets/PFP/Boy7.jpeg';
import Image7 from '../../../assets/PFP/funnyboy1.jpeg';
import Image8 from '../../../assets/PFP/funnygirl.jpeg';
import Image9 from '../../../assets/PFP/funnygirl2.jpeg';
import Image10 from '../../../assets/PFP/girl1.png';
import Image11 from '../../../assets/PFP/girl2.png';
import Image12 from '../../../assets/PFP/girl3.jpg';
import Image13 from '../../../assets/PFP/Girl3.png';
import Image14 from '../../../assets/PFP/girl4.jpg';
import Image15 from '../../../assets/PFP/Girl5.jpg';
import Image16 from '../../../assets/PFP/Girl6.jpg';
import Image17 from '../../../assets/PFP/Girl7.jpg';
import Image18 from '../../../assets/PFP/mask1.png';
import { FaCheck } from 'react-icons/fa';
import { ImageUpload } from '../../../Functions/ImageControl';
import { Navigate, useNavigate } from 'react-router-dom';

function UserImage() {
	const [Loading, setLoading] = useState<boolean>(true);
	const [UserDetails, setUserDetails] = useState<any>();
	const [NewImage, setNewImage] = useState('');
	const navigate = useNavigate();
	const auth = getAuth();
	const user = auth.currentUser;
	const images: string[] = [
		Image1,
		Image2,
		Image3,
		Image4,
		Image5,
		Image6,
		Image7,
		Image8,
		Image9,
		Image10,
		Image11,
		Image12,
		Image13,
		Image14,
		Image15,
		Image16,
		Image17,
		Image18,
	];

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

	const ChangePicture = async () => {
		setLoading(true);
		await ImageUpload(user, NewImage);
		navigate('/settings');
		setLoading(false);
	};

	useEffect(() => {
		PullData().then(() => setLoading(false));
	}, []);

	return (
		<div className="NewUserImageContainer">
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<div className="TopSection">
						<Button onClick={() => navigate('/settings')}>Cancel</Button>
						<span>
							<img src={UserDetails.DisplayPicture} />
							<p>{UserDetails.Username}</p>
						</span>
						<Button onClick={ChangePicture}>Save</Button>
					</div>
					<div className="ImagesContainer">
						{images.map((Image: string, index: number) => {
							return (
								<div key={index}>
									<img src={Image} onClick={() => setNewImage(Image)} />
									{NewImage === Image ? <FaCheck className="New" /> : ''}
									{UserDetails.DisplayPicture === Image ? (
										<FaCheck className="Current" />
									) : (
										''
									)}
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}

export default UserImage;
