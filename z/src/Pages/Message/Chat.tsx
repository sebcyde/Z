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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MessageComponent from '../../Components/Messages/MessageComponent';
import { app, auth, db } from '../../config/Firebase';
import { SendMessage } from '../../Functions/SendMessage';
import LoadingScreen from '../LoadingScreen';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { v4 as uuidv4 } from 'uuid';
import { MessageObject } from '../../Types/MessageTypes';
import { SendNotif } from '../../Functions/SendNotif';
import { UpdateLastSeen } from '../../Store/Slices/NotifSlice';
import { UpdateLatestNotification } from '../../Functions/UpdateLastSeen';

type Props = {};
const ArrowStyle = { marginRight: '10px' };

function ChatPage({}: Props) {
	const UserQueryID = useSelector((state: any) => state.UserState);
	const [SendButtonLoading, setSendButtonLoading] = useState(false);
	const [QUserDBDetails, setQUserDBDetails] = useState<any>();
	const [UserDBDetails, setUserDBDetails] = useState<any>();
	const [QUserDetails, setQUserDetails] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);
	const [NewMessage, setNewMessage] = useState('');
	const navigate = useNavigate();

	const EndOfMessagesRef = useRef<null | HTMLDivElement>(null);

	const [user] = useAuthState(auth);
	const [ChatValue] = useCollection(collection(getFirestore(app), `Chats`));

	const ChatAlreadyExists = async () => {
		return ChatValue?.docs.filter((doc) => {
			return (
				(doc.data().users[0] == user?.uid &&
					doc.data().users[1] == QUserDetails.UID) ||
				(doc.data().users[1] == user?.uid &&
					doc.data().users[0] == QUserDetails.UID)
			);
		});
	};

	async function Send(NewMessage: any) {
		const UniqueMessageID = uuidv4();
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

		if (user) {
			const docRef = doc(db, `Users/${user.uid}`);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				await SendNotif(
					QUserDetails.UID,
					docSnap.data().Username,
					'Message',
					docSnap.data().DisplayPicture
				);
				await UpdateLatestNotification(QUserDetails.UID);
			} else {
				console.log('No user doc for notif to send!');
			}
		}

		//SendNotif(user?.displayName, 'Message', user?.photoURL!);
	}

	const [value] = useCollection(
		collection(getFirestore(app), `Users/${user?.uid}/MoreInfo/Chats/AllChats`)
	);

	const ScrollToBottom = () => {
		EndOfMessagesRef.current!.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	const PullData = async () => {
		console.log('Recipient Details:', UserQueryID);
		try {
			if (user) {
				const QUser = doc(db, `Users/${UserQueryID.User}`);
				const QUserSnap = await getDoc(QUser);
				if (QUserSnap.exists()) {
					setQUserDetails(QUserSnap.data());
				} else {
					console.log('Failed to retrieve recipient details');
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
							<div className="RecieverImageContainer">
								<img
									src={QUserDetails.DisplayPicture}
									onClick={() => {
										navigate('/user');
									}}
								/>
							</div>
						</span>
					</div>
					<div className="MessagesContainer">
						<MessageComponent
							User={user!.uid}
							ChatParticipants={QUserDetails.UID}
						/>
						<div ref={EndOfMessagesRef}></div>
					</div>
					<div className="NewMessageContainer">
						<input
							placeholder="Send a message..."
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setNewMessage(e.currentTarget.value);
							}}
							value={NewMessage}
						></input>
						<button
							className={SendButtonLoading ? 'LoadingButton' : ''}
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
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default ChatPage;
