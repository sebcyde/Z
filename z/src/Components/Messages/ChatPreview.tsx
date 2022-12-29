import { Avatar, AvatarGroup } from '@mui/material';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { app, auth, db } from '../../config/Firebase';
import { GetRecipientsEmails } from '../../Functions/GetRecipientsEmail';
import { TimeSort } from '../../Functions/TimeSort';
import LoadingScreen from '../../Pages/LoadingScreen';
import { SetUser } from '../../Store/Slices/UserSlice';
import { MessageObject } from '../../Types/MessageTypes';

type Props = {
	id: string;
	users: string[];
};

const ChatPreview = ({ id, users }: Props) => {
	const [Recipients, setRecipients] = useState<any[]>([]);
	const [FinalMessages, setFinalMessages] = useState<MessageObject>();
	const [Loading, setLoading] = useState(true);
	const [user] = useAuthState(auth);
	const RawUserData: any[] = [];
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const PullData = async () => {
		if (user) {
			console.log(user);

			// Retrieves UIDs of everyone except logged in user
			const RecipientsArray = GetRecipientsEmails(user.uid, users);

			console.log('Recipients Array:', RecipientsArray);

			// For non-groupchats
			if (RecipientsArray.length < 2) {
				// Gets snapshot of chat with non signed in user
				const Snapshot = query(
					collection(db, 'Chats'),
					where('users', 'array-contains', RecipientsArray[0])
				);

				// Retrieves Message data and timestamp
				const querySnapshot = await getDocs(Snapshot);

				const Messages = querySnapshot.docs[0]?.data().Messages;
				console.log('Raw Messages:', Messages);

				// Sort messages by timestamp
				let SortedMessages = TimeSort(Messages);
				console.log('Sorted Messages:', SortedMessages);
				setFinalMessages(SortedMessages[0]);

				// Gets Recipients User Details (Username etc)
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
		}
	};

	const OpenChat = () => {
		dispatch(SetUser(Recipients[0].UID));
		navigate('/message');
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
					{/* <p>{Recipients[0].DisplayPicture}</p> */}
					{Recipients.length < 2 ? (
						<div className="ChatPreviewSingleContainer" onClick={OpenChat}>
							<div className="ImageContainer">
								<img src={Recipients[0].DisplayPicture} />
							</div>
							<div>
								<p>{Recipients[0].Username}</p>
								<p>{FinalMessages?.Message}</p>
							</div>
						</div>
					) : (
						<div className="ChatPreviewDoubleContainer">
							<div className="ImageContainer">
								<img src={Recipients[Recipients.length - 1].DisplayPicture} />
							</div>
							<div>
								<span>
									{Recipients.map((User) => (
										<p>{User.Username},</p>
									))}
								</span>
								<p>Message Preview</p>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default ChatPreview;
