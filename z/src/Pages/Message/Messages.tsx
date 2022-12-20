import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { app, auth, db } from '../../config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AlphaSort } from '../../Functions/AlphaSort';
import LoadingScreen from '../LoadingScreen';
import { Avatar, AvatarGroup } from '@mui/material';

type Props = {};

function Messages({}: Props) {
	const [user, Authloading, Autherror] = useAuthState(auth);
	const [MessageUsers, setMessageUsers] = useState<any[]>([]);
	const [Messages, setMessages] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);
	const SortedMessages: any[] = [];

	const [value, loading, error] = useCollection(
		collection(getFirestore(app), `Users/${user?.uid}/MoreInfo/Chats/AllChats`),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const Convolute = async () => {
		let X = 0;
		let AllIDs = new Set();
		if (value) {
			value.docs.forEach((level1doc) => {
				X++;
				value.docs.map(async (doc) => {
					let L1ID = level1doc.data().MessageID;
					let L2ID = doc.data().MessageID;

					if (L1ID && L2ID && L1ID != L2ID) {
						if (!AllIDs.has(doc.data().MessageID)) {
							AllIDs.add(doc.data().MessageID);
							SortedMessages.push(doc.data());
						}
					}
				});
			});

			console.log(X);
			console.log('Sorted Messages:', SortedMessages);
			console.log('All IDs:', AllIDs);
		}
		const GetAvatars = async () => {
			const Avs = await Promise.all(
				SortedMessages.map((Message: any, index: number) => {
					return (
						<div style={{ margin: '10px', color: 'white' }} key={index}>
							<div>
								<AvatarGroup>
									{Message.Users.map(async (User: any, indx: number) => {
										const docRef = doc(db, `Users/${User}`);
										const docSnap = await getDoc(docRef);
										console.log('Data:', docSnap.data());

										console.log('Username:', docSnap.data()?.Username);
										console.log('Image:', docSnap.data()?.DisplayPicture);
										return (
											<>
												<Avatar
													key={indx}
													alt={docSnap.data()?.Username}
													src={docSnap.data()?.DisplayPicture}
												/>
											</>
										);
									})}
								</AvatarGroup>
							</div>
							<p>{Message.MessageObject.Message}</p>
							<hr />
						</div>
					);
				})
			);
			return Avs;
		};

		const Avatars = await GetAvatars();
		console.log(Avatars);
		setMessages(Avatars);
	};

	// FIXXXX
	useEffect(() => {
		Convolute()
			.then(() => setMessages(SortedMessages))
			.then(() => setLoading(false));
	}, [value]);

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
