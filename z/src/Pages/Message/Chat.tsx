import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { getAuth } from 'firebase/auth';
import {
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaCrown } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MessageComponent from '../../Components/Messages/MessageComponent';
import { app, auth, db } from '../../config/Firebase';
import { SendMessage } from '../../Functions/SendMessage';
import LoadingScreen from '../LoadingScreen';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UpdateLastSeen } from '../../Functions/UpdateLastSeen';
import { v4 as uuidv4 } from 'uuid';
import { MessageObject } from '../../Types/MessageTypes';

type Props = {};
const ArrowStyle = { marginRight: '10px' };

function Recommend({}: Props) {
	const UserQueryID = useSelector((state: any) => state.UserState);
	const [SendButtonLoading, setSendButtonLoading] = useState(false);
	const [QUserDBDetails, setQUserDBDetails] = useState<any>();
	const [UserDBDetails, setUserDBDetails] = useState<any>();
	const [QUserDetails, setQUserDetails] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);
	const [NewMessage, setNewMessage] = useState('');
	const navigate = useNavigate();
	const [Ref1, setRef1] = useState<any>();
	// const auth = getAuth();
	// const user = auth.currentUser;

	const EndOfMessagesRef = useRef<null | HTMLDivElement>(null);

	// New Version of Messaging
	const [user] = useAuthState(auth);
	const [ChatValue] = useCollection(collection(getFirestore(app), `Chats`));

	async function Send(NewMessage: any) {
		const UniqueMessageID = uuidv4();

		async function ChatAlreadyExists() {
			return ChatValue?.docs.filter((doc) => {
				return (
					doc.data().users[0] == user?.uid &&
					doc.data().users[1] == QUserDetails.UID
				);
			});
		}

		const chatExists = await ChatAlreadyExists();

		if (chatExists == undefined || chatExists.length == 0) {
			console.log("Chat doesn't exist");
			// Create new chat and add message to messages array
			await setDoc(doc(db, `Chats/${UniqueMessageID}`), {
				ChatID: UniqueMessageID,
				users: [user?.uid, QUserDetails.UID],
				Messages: [
					{
						Message: NewMessage,
						Sender: QUserDetails.UID,
						Timestamp: Date.now(),
					},
				],
			});
		} else {
			// If a chat already exists, add to the Messages array
			await updateDoc(doc(db, `Chats/${chatExists[0].data().ChatID}`), {
				Messages: arrayUnion({
					Message: NewMessage,
					Sender: QUserDetails.UID,
					Timestamp: Date.now(),
				}),
			});
		}
	}

	// End of New Version Messaging

	const [value] = useCollection(
		collection(getFirestore(app), `Users/${user?.uid}/MoreInfo/Chats/AllChats`)
	);

	const ChatParticipants: string[] = [user?.uid, UserQueryID.UID];

	// const [value, loading, error] = useCollection(
	// 	collection(getFirestore(app), `Users/${user?.uid}/MoreInfo/Chats/AllChats`),
	// 	{
	// 		snapshotListenOptions: { includeMetadataChanges: true },
	// 	}
	// );

	const ScrollToBottom = () => {
		console.log('Scrolling');
		EndOfMessagesRef.current!.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

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

	useEffect(() => {
		PullData().then(() => {
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		setTimeout(() => {
			ScrollToBottom();
		}, 1000);
	}, [value]);

	return (
		<>
			{Loading ? (
				<LoadingScreen />
			) : (
				<div className="MessagePage ">
					<div className="Navigation">
						<span
							style={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<span onClick={() => navigate('/allchats')}>
								<FaArrowLeft />
								<h2>back</h2>
							</span>

							<span
								onClick={() => {
									navigate('/user');
								}}
							>
								<h2>{QUserDetails.Username}</h2>
								<p>{QUserDetails.Admin ? <FaCrown /> : ''}</p>
							</span>
							<img
								src={QUserDetails.DisplayPicture}
								onClick={() => {
									navigate('/user');
								}}
							/>
						</span>
					</div>
					<div className="MessagesContainer">
						<MessageComponent
							User={user!.uid}
							ChatParticipants={[user!.uid, QUserDetails.UID]}
						/>
						<div ref={EndOfMessagesRef}></div>
					</div>
					<Box className="NewMessageContainer">
						<TextField
							id="input-with-sx"
							placeholder="Send a message..."
							variant="standard"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setNewMessage(e.currentTarget.value);
							}}
							value={NewMessage}
						/>
						<Button
							className="SendImage"
							onClick={() => {
								if (NewMessage.length > 0) {
									setSendButtonLoading(true);

									Send(NewMessage).then(() => {
										setNewMessage('');
										setSendButtonLoading(false);
										ScrollToBottom();
									});
								}
							}}
						>
							{SendButtonLoading ? (
								<HourglassEmptyIcon />
							) : (
								<ArrowForwardIcon />
							)}
						</Button>
					</Box>
				</div>
			)}
		</>
	);
}

export default Recommend;
