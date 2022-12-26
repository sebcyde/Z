import { Avatar, AvatarGroup } from '@mui/material';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { app, auth, db } from '../../config/Firebase';
import { GetRecipientsEmails } from '../../Functions/GetRecipientsEmail';
import LoadingScreen from '../../Pages/LoadingScreen';

type Props = {
	id: string;
	users: string[];
};

const ChatPreview = ({ id, users }: Props) => {
	const [Recipients, setRecipients] = useState<any[]>([]);
	const [Loading, setLoading] = useState(true);
	const [user] = useAuthState(auth);
	const RawUserData: any[] = [];

	const PullData = async () => {
		if (user) {
			console.log(user);

			const RecipientsArray = GetRecipientsEmails(user.uid, users);

			console.log('Recipients Array:', RecipientsArray);

			await Promise.all(
				RecipientsArray.map(async (User) => {
					const docRef = doc(db, `Users/${User}`);
					const docSnap = await getDoc(docRef);
					if (docSnap.exists()) {
						RawUserData.push(docSnap.data());
					}

					return;
				})
			);
			console.log('Raw User Data:', RawUserData);
			setRecipients(RawUserData);
		}
	};

	useEffect(() => {
		PullData().then(() => setLoading(false));
	}, []);

	return (
		<div className="ChatPreviewContainer">
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					{Recipients.length < 2 ? (
						<div className="ChatPreviewSingleContainer">
							<div>
								<Avatar
									alt={Recipients[0].Username}
									src={Recipients[0].DisplayPicture}
								/>
							</div>
							<p>{Recipients[0].Username}</p>
						</div>
					) : (
						<div className="ChatPreviewDoubleContainer">
							<AvatarGroup max={4}>
								{Recipients.map((User) => {
									return (
										<Avatar alt={User.Username} src={User.DisplayPicture} />
									);
								})}
							</AvatarGroup>
							<span>
								{Recipients.map((User) => (
									<p>{User.Username}</p>
								))}
							</span>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default ChatPreview;
