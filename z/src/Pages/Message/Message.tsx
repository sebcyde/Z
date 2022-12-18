import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaCrown } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/Firebase';
import LoadingScreen from '../LoadingScreen';

type Props = {};
const ArrowStyle = { marginRight: '10px' };

function Recommend({}: Props) {
	const UserQueryID = useSelector((state: any) => state.UserState);
	const [QUserDBDetails, setQUserDBDetails] = useState<any>();
	const [UserDBDetails, setUserDBDetails] = useState<any>();
	const [QUserDetails, setQUserDetails] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();
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
					setUserDBDetails(UserDBSnap.data());
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
					setQUserDBDetails(QUserDBSnap.data());
				} else {
					console.log('Failed to retrieve Quser details');
				}

				const QUser = doc(db, `Users/${UserQueryID.UserID}`);
				const QUserSnap = await getDoc(QUser);
				if (QUserSnap.exists()) {
					console.log('Q User Details:', QUserSnap.data());
					setQUserDetails(QUserSnap.data());
				} else {
					console.log('Failed to retrieve Quser details');
				}
			}
		} catch (error: any) {
			console.log(`Error ${error.code}:`, error.message);
		}
	};

	const NavFriends = () => navigate('/');

	useEffect(() => {
		PullData().then(() => setLoading(false));
	}, []);

	return (
		<>
			{Loading ? (
				<LoadingScreen />
			) : (
				<div className="RecommendContainer">
					<div className="Navigation">
						<span
							style={{
								display: 'flex',
								alignItems: 'center',
							}}
							onClick={() => navigate('/user')}
						>
							<FaArrowLeft style={ArrowStyle} />
							<p>Back</p>
						</span>
					</div>
					<div className="RecoUserBanner">
						<img src={QUserDetails.DisplayPicture} />
						<span>
							<h2>{QUserDetails.Username}</h2>
							<p>{QUserDetails.Admin ? <FaCrown /> : ''}</p>
						</span>
					</div>
				</div>
			)}
		</>
	);
}

export default Recommend;
