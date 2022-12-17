import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../config/Firebase';

type Props = {};

function Recommend({}: Props) {
	const UserQueryID = useSelector((state: any) => state.UserState);
	const [Loading, setLoading] = useState(true);
	const [UserDetails, setUserDetails] = useState<any>();
	const [QUserDetails, setQUserDetails] = useState<any>();
	const auth = getAuth();
	const user = auth.currentUser;

	const PullData = async () => {
		console.log(UserQueryID);
		try {
			if (user) {
				const UserDB = doc(db, `Users/${user.uid}/MoreInfo/Recommendations`);
				const UserDBSnap = await getDoc(UserDB);
				if (UserDBSnap.exists()) {
					console.log('User Details:', UserDBSnap.data());
					setUserDetails(UserDBSnap.data());
				} else {
					console.log('Failed to retrieve user details');
				}

				const QUserDB = doc(
					db,
					`Users/${UserQueryID.UserID}/MoreInfo/Recommendations`
				);
				const QUserDBSnap = await getDoc(QUserDB);
				if (QUserDBSnap.exists()) {
					console.log('Q User Details:', QUserDBSnap.data());
					setUserDetails(QUserDBSnap.data());
				} else {
					console.log('Failed to retrieve user details');
				}
			}
		} catch (error: any) {
			console.log(`Error ${error.code}:`, error.message);
		}
	};

	useEffect(() => {
		PullData().then(() => setLoading(false));
	}, []);

	return (
		<div className="RecommendContainer">
			<div className="RecoUserBanner"></div>
		</div>
	);
}

export default Recommend;
