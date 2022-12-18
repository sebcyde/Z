import { collection, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { app, auth } from '../../config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AlphaSort } from '../../Functions/AlphaSort';

type Props = {};

function Messages({}: Props) {
	const [user, Authloading, Autherror] = useAuthState(auth);
	const [MessageUsers, setMessageUsers] = useState<any[]>([]);
	const SortedMessages = new Set();

	const [value, loading, error] = useCollection(
		collection(getFirestore(app), `Users/${user?.uid}/MoreInfo/Chats/AllChats`),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	// FIXXXX
	// useEffect(() => {
	// 	if (value)
	// 		value!.docs.map(async (doc) => {
	// 			if (ChatParticipants.length != doc.data().Users.length) return null;

	// 			const Pos = doc.data().Users.map((User: any, index: number) => {
	// 				let DBUsers = doc
	// 					.data()
	// 					.Users.sort((a: string, b: string) => a.localeCompare(b));

	// 				let CPUsers = ChatParticipants.sort((a: string, b: string) =>
	// 					a.localeCompare(b)
	// 				);

	// 				if (DBUsers[index] != CPUsers[index]) return false;
	// 				else return true;
	// 			});

	// 			if (!Pos.includes(false)) PossibleChats.push(doc.data());
	// 		});
	// 	console.log(SortedMessages);
	// }, [value]);

	return <div>Messages</div>;
}

export default Messages;
