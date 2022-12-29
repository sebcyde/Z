import React, { useEffect, useState } from 'react';
import { collection, DocumentData, getFirestore } from 'firebase/firestore';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { app } from '../../config/Firebase';
import LoadingScreen from '../../Pages/LoadingScreen';
import { TimeSort } from '../../Functions/TimeSort';
import { MessageObject } from '../../Types/MessageTypes';
import { reverse } from 'lodash';

type Props = { User: string; ChatParticipants: string };

function MessageComponent({ User, ChatParticipants }: Props) {
	const [AllMessages, setAllMessages] = useState<MessageObject[]>();
	const [Loading, setLoading] = useState(true);

	const [ChatValue] = useCollection(collection(getFirestore(app), `Chats`));

	const ChatAlreadyExists = async () => {
		return ChatValue?.docs.filter((doc) => {
			return (
				(doc.data().users[0] == User &&
					doc.data().users[1] == ChatParticipants) ||
				(doc.data().users[1] == User && doc.data().users[0] == ChatParticipants)
			);
		});
	};

	const PullMessages = async () => {
		const chatExists = await ChatAlreadyExists();

		console.log('Chat Filter Response:', chatExists);

		if (chatExists == undefined || chatExists.length == 0) {
			console.log('Chat doesnt exist');
		} else {
			console.log('Messages Data:', chatExists[0].data());
			let SortedMessages = TimeSort(chatExists[0].data().Messages);

			setAllMessages(SortedMessages.reverse());
		}
	};

	const GetTime = (Seconds: number): string => {
		const result = new Date(Seconds).toISOString().slice(11, 16);
		console.log(result); // 👉️ "00:10:00" (hh:mm:ss)
		return result;
	};

	useEffect(() => {
		PullMessages().then(() => setLoading(false));
	}, [ChatValue]);

	return (
		<div className="ChatContainer">
			{Loading ? (
				<LoadingScreen />
			) : (
				AllMessages && (
					<>
						{AllMessages.map((Chat: MessageObject) => {
							return (
								<div
									className={
										User == Chat.Sender ? 'Sender Message' : 'Reciever Message'
									}
								>
									<p>{Chat.Message}</p>
									<p className="MessageTimeStamp">{GetTime(Chat.Timestamp)}</p>
								</div>
							);
						})}
					</>
				)
			)}
		</div>
	);
}

export default MessageComponent;
