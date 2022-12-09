import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../../config/Firebase.js';
import { ImageUpload, RetrieveImage } from '../../Functions/ImageControl.js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LoadingScreen from '../LoadingScreen.js';
import { Toast } from 'react-bootstrap';

type Props = {};
type NewUserDetailsType = {
	firstName: string;
	displayName: string;
	email: string;
	photoURL: string;
};

const HRStyle = {
	color: 'orange',
};

function Edit({}: Props) {
	const [UserDetails, setUserDetails] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);
	const [UserDeets, setUserDeets] = useState<NewUserDetailsType>();

	const [UserImage, setUserImage] = useState<File>();
	const [UserDisplayName, setUserDisplayName] = useState<string>();
	const [UserName, setUserName] = useState<string>();
	const [UserEmail, setUserEmail] = useState<string>();
	const [UserPassword, setUserPassword] = useState<string>();
	const [show, setShow] = useState(false);
	const navigate = useNavigate();
	const auth = getAuth();
	const user = auth.currentUser;

	const PullData = async () => {
		const docRef = doc(db, `Users/${user!.uid}`);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			console.log('Deets:', docSnap.data());
			setUserDetails(docSnap.data());
		} else {
			console.log('No such document!');
		}
	};

	const Startup = async () => {
		await PullData();
		setLoading(false);
		console.log('User Details From Auth:', auth.currentUser);
		console.log('User Details From DB:', UserDetails);
	};

	useEffect(() => {
		Startup();
	}, []);

	const UpdateState = (key: string, value: string | number) => {
		// UserDeets.[key] = value;
		// setUserDeets({UserDeets})
	};

	const UpdateImage = (e: any) => {
		ImageUpload(e.target.files[0]);
	};

	const UpdateDetails = async (e: any) => {
		e.preventDefault();

		console.log(UserDeets);
	};

	return (
		<div>
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<p style={{ marginTop: '10px', width: '100%', textAlign: 'center' }}>
						Account created: {auth.currentUser!.metadata.creationTime}
					</p>

					<Form>
						<Form.Group className="mb-3" controlId="DisplayPicture">
							<Form.Label>Display Picture</Form.Label>
							<Form.Control type="file" onChange={UpdateImage} />
						</Form.Group>

						<hr style={HRStyle} />

						<Form.Group className="mb-3" controlId="DisplayName">
							<Form.Label>Display Name</Form.Label>
							<Form.Control type="text" placeholder="Display Name" />
						</Form.Group>
						<hr style={HRStyle} />

						{/* <Form.Group className="mb-3" controlId="Name">
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" placeholder="Enter Name" />
						</Form.Group>
						<hr style={HRStyle} /> */}

						<Form.Group className="mb-3" controlId="Email">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" />
						</Form.Group>
						<hr style={HRStyle} />

						<Form.Group className="mb-3" controlId="Password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" />
						</Form.Group>

						<span>
							<Button variant="primary" type="submit" onClick={UpdateDetails}>
								Save
							</Button>
							<Button
								variant="primary"
								onClick={() => {
									navigate('/settings');
								}}
							>
								Cancel
							</Button>
						</span>
					</Form>
					<Toast
						onClose={() => setShow(false)}
						show={show}
						delay={3000}
						autohide
					>
						<Toast.Header>
							<img
								src="holder.js/20x20?text=%20"
								className="rounded me-2"
								alt=""
							/>
							<strong className="me-auto">Bootstrap</strong>
							<small>11 mins ago</small>
						</Toast.Header>
						<Toast.Body>
							Woohoo, you're reading this text in a Toast!
						</Toast.Body>
					</Toast>
				</>
			)}
		</div>
	);
}

export default Edit;
