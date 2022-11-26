import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase.js';

type Props = {};
type UserDetails = {
	firstName: string;
	lastName: string;
	displayName: string;
	email: string;
	phoneNumber: number;
	photoURL: string;
};

function Edit({}: Props) {
	const [UserDetails, setUserDetails] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);
	const [UserDeets, setUserDeets] = useState<UserDetails>();
	const navigate = useNavigate();
	const auth = getAuth();
	const user = auth.currentUser;

	const PullData = async () => {
		const docRef = doc(db, `Users/${user!.uid}`);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			setUserDetails(docSnap.data());
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

	return <div>Edit</div>;
}

export default Edit;
