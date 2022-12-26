import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { app, auth, db } from '../../config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AlphaSort } from '../../Functions/AlphaSort';
import LoadingScreen from '../LoadingScreen';
import { Avatar, AvatarGroup } from '@mui/material';
import { AllChatsConverter } from '../../Functions/AllChatsConverter';

type Props = {};

function Messages({}: Props) {
	const [user, Authloading, Autherror] = useAuthState(auth);
	const [Messages, setMessages] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);

	const [value, loading, error] = useCollection(
		collection(getFirestore(app), `Users/${user?.uid}/MoreInfo/Chats/AllChats`)
	);

	const getAllChats = async () => {
		const allChats: any[] = [];
		const usersRef = await getDocs(collection(db, 'Chats'));

		const chatPromises = usersRef.docs.map(async (userDoc: any) => {
			const userData = userDoc.data();

			const ChatRef = await getDocs(
				collection(db, `Users/${userData.UID}/MoreInfo/Chats/AllChats`)
			);

			ChatRef.docs.forEach((Doc) => allChats.push(Doc));
		});

		await Promise.all(chatPromises);

		console.log('allChats:', allChats);
		const FinalArray = AllChatsConverter(allChats);
		console.log('FinalArray:', FinalArray);
	};

	// return allChats;

	useEffect(() => {
		getAllChats();
	}, []);

	return (
		<div>
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					{Messages.map((Message: any) => (
						<>{Message}</>
					))}
				</>
			)}
		</div>
	);
}

export default Messages;
