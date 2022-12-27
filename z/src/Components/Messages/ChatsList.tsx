import { doc, collection, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../../config/Firebase';
import { ChatSort } from '../../Functions/TimeSort';
import LoadingScreen from '../../Pages/LoadingScreen';
import { ChatObject } from '../../Types/MessageTypes';
import ChatPreview from './ChatPreview';

type Props = {};

const ChatsList = (props: Props) => {
	const [user] = useAuthState(auth);
	const UserChatRef = query(
		collection(db, 'Chats'),
		where('users', 'array-contains', user?.uid)
	);
	const [ChatsSnapshot] = useCollection(UserChatRef);
	const [Loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(false);
	}, [ChatsSnapshot]);

	return (
		<div>
			{ChatsSnapshot &&
				ChatSort(ChatsSnapshot?.docs).map((Chat: any) => {
					return (
						<ChatPreview
							// key={Chat.data().id}
							id={Chat.ChatID}
							users={Chat.users}
						/>
					);
				})}
		</div>
	);
};

export default ChatsList;
