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
	console.log(User);

	const [value, loading, error] = useCollection(
		collection(getFirestore(app), `Users/${User}/MoreInfo/Chats/AllChats`),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const RetrieveChat = async (
		ChatParticipants: string[],
		DBDocParticipants: string[]
	) => {
		console.log('Chat Participant:', ChatParticipants.length);
		console.log('DB Doc Participants:', DBDocParticipants.length);

		if (ChatParticipants.length != DBDocParticipants.length) return false;

		// Needs to go in a loop of all DB chats

		const Chat = DBDocParticipants.forEach((User) => {
			if (ChatParticipants.includes(User)) return true;
		});

		return Chat;
	};

	const GetChat = async () => {
		const PossibleChats: DocumentData[] = [];

		await Promise.all(
			value!.docs.map(async (doc) => {
				console.log(doc.data().MessageObject.Message);

				if (ChatParticipants.length != doc.data().Users.length) return null;

				const Pos = doc.data().Users.map((User: any) => {
					if (!ChatParticipants.includes(User)) return null;
				});

				if (Pos != null) PossibleChats.push(doc.data());
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
				return (
					<div
						className="Message"
						style={
							User == Chat.MessageObject.SendingUser
								? {
										marginLeft: 'auto',
										backgroundColor: 'gray',
										color: 'white',
								  }
								: {
										marginRight: 'auto',
										backgroundColor: 'green',
										color: 'white',
								  }
						}
					>
						<p>{Chat.MessageObject.Message}</p>
					</div>
				);
			})
		);
	};

	useEffect(() => {
		if (value) {
			GetChat()
				.then(() => setLoading(false))
				.then(() => console.log(ActualChat));
		}
	}, [value]);

	return (
		<div className="ChatContainer">
			{Loading ? (
				<h2>Retreiving Chat</h2>
			) : (
				ActualChat && <>{ActualChat.map((Chat: any) => Chat)}</>
			)}
		</div>
	);
}

export default MessageComponent;
