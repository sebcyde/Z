import { doc, collection, query, where } from 'firebase/firestore';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../../config/Firebase';
import ChatPreview from './ChatPreview';

type Props = {};

const ChatsList = (props: Props) => {
	const [user] = useAuthState(auth);
	const UserChatRef = query(
		collection(db, 'Chats'),
		where('users', 'array-contains', user?.uid)
	);
	const [ChatsSnapshot] = useCollection(UserChatRef);

	return (
		<div>
			{ChatsSnapshot?.docs.map((Chat) => {
				console.log('Chat:', Chat.data());
				return (
					<ChatPreview
						// key={Chat.data().id}
						id={Chat.data().id}
						users={Chat.data().users}
					/>
				);
			})}
		</div>
	);
};

export default ChatsList;
