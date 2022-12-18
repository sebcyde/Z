import React, { useEffect, useState } from 'react';
import {
	addDoc,
	collection,
	doc,
	DocumentData,
	getFirestore,
	serverTimestamp,
	setDoc,
	Timestamp,
} from 'firebase/firestore';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { app } from '../../config/Firebase';
import LoadingScreen from '../../Pages/LoadingScreen';
type Props = { User: string; ChatParticipants: string[] };

type DBMessageObject = {
	Users: string[];
	MessageObject: {
		SendingUser: string;
		Message: string;
		Time: {
			seconds: number;
			nanoseconds: number;
		};
	};
};

function MessageComponent({ User, ChatParticipants }: Props) {
	const [ActualChat, setActualChat] = useState<any>();
	const [Loading, setLoading] = useState(true);

	const [value, loading, error] = useCollection(
		collection(getFirestore(app), `Users/${User}/MoreInfo/Chats/AllChats`),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const GetChat = async () => {
		const PossibleChats: DocumentData[] = [];

		await Promise.all(
			value!.docs.map(async (doc) => {
				if (ChatParticipants.length != doc.data().Users.length) return null;

				const Pos = doc.data().Users.map((User: any, index: number) => {
					let DBUsers = doc
						.data()
						.Users.sort((a: string, b: string) => a.localeCompare(b));

					let CPUsers = ChatParticipants.sort((a: string, b: string) =>
						a.localeCompare(b)
					);

					if (DBUsers[index] != CPUsers[index]) return false;
					else return true;
				});

				if (!Pos.includes(false)) PossibleChats.push(doc.data());
			})
		);

		PossibleChats.sort(function compare(a: any, b: any) {
			if (a.MessageObject.Time.toDate() < b.MessageObject.Time.toDate()) {
				return -1;
			}
			if (a.MessageObject.Time.toDate() < b.MessageObject.Time.toDate()) {
				return 1;
			}
			// a must be equal to b
			return 0;
		});

		setActualChat(
			PossibleChats.map((Chat: DocumentData) => {
				let Hours = Chat.MessageObject.Time.toDate().getHours();
				let Minutes = Chat.MessageObject.Time.toDate().getMinutes();

				const withPmAm = Chat.MessageObject.Time.toDate().toLocaleTimeString(
					'en-GB',
					{
						hour: '2-digit',
						minute: '2-digit',
					}
				);

				return (
					<div
						className={
							User == Chat.MessageObject.SendingUser
								? 'Sender Message'
								: 'Reciever Message'
						}
					>
						<p>{Chat.MessageObject.Message}</p>
						<p className="MessageTimeStamp">{withPmAm}</p>
					</div>
				);
			})
		);
	};

	useEffect(() => {
		if (value) {
			GetChat().then(() => setLoading(false));
		}
	}, [value]);

	return (
		<div className="ChatContainer">
			{Loading ? (
				<LoadingScreen />
			) : (
				ActualChat && <>{ActualChat.map((Chat: any) => Chat)}</>
			)}
		</div>
	);
}

export default MessageComponent;
