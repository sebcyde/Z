import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase.js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LoadingScreen from '../LoadingScreen.js';

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
	//
	// User Details State to be put into overall state and pushed to DB
	const [UserImage, setUserImage] = useState<string>();
	const [UserDisplayName, setUserDisplayName] = useState<string>();
	const [UserName, setUserName] = useState<string>();
	const [UserEmail, setUserEmail] = useState<string>();
	const [UserPassword, setUserPassword] = useState<string>();
	//
	const navigate = useNavigate();
	const auth = getAuth();
	const user = auth.currentUser;

	const Startup = async () => {
		await PullData();
		setLoading(false);
		console.log('User Details From Auth:', auth.currentUser);
		console.log('User Details From DB:', UserDetails);
	};

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

	useEffect(() => {
		Startup();
	}, []);

	const UpdateState = (key: string, value: string | number) => {
		// UserDeets.[key] = value;
		// setUserDeets({UserDeets})
	};

	const UpdateDetails = async () => {
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
							<Form.Control
								type="file"
								onChange={(e) => {
									setUserDeets(undefined);
								}}
							/>
						</Form.Group>

						<hr style={HRStyle} />

						<Form.Group className="mb-3" controlId="DisplayName">
							<Form.Label>Display Name</Form.Label>
							<Form.Control type="text" placeholder="Display Name" />
						</Form.Group>
						<hr style={HRStyle} />

						<Form.Group className="mb-3" controlId="Name">
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" placeholder="Enter Name" />
						</Form.Group>
						<hr style={HRStyle} />

						<Form.Group className="mb-3" controlId="Email">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" />
						</Form.Group>
						<hr style={HRStyle} />

						<Form.Group className="mb-3" controlId="Password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" />
						</Form.Group>

						<Button variant="primary" type="submit" onClick={UpdateDetails}>
							Save
						</Button>
					</Form>
				</>
			)}
		</div>
	);
}

export default Edit;
