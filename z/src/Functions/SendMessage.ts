import { FirebaseError } from 'firebase/app';
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	setDoc,
} from 'firebase/firestore';
import { db } from '../config/Firebase';

export const SendMessage = async (
	LoggedInUser: string,
	RecievingUsers: string[],
	Message: string
) => {
	const AddToUserDB = async () => {
		// Add message to Logged in users DB
		await addDoc(
			collection(db, `Users/${LoggedInUser}/MoreInfo/Chats/AllChats`),
			{
				Users: [LoggedInUser, ...RecievingUsers],
				MessageObject: {
					SendingUser: LoggedInUser,
					Message: Message,
					Time: serverTimestamp(),
				},
			}
		);
	};

	async function AddToRemainingDBs() {
		await Promise.all(
			RecievingUsers.map(async (User: string) => {
				await addDoc(collection(db, `Users/${User}/MoreInfo/Chats/AllChats`), {
					Users: [LoggedInUser, ...RecievingUsers],
					MessageObject: {
						SendingUser: LoggedInUser,
						Message: Message,
						Time: serverTimestamp(),
					},
				});
			})
		);
	}

	try {
		await AddToUserDB();
		await AddToRemainingDBs();
		console.log('Added to all DBs');
	} catch (error: any) {
		console.log(error.message);
	}
};
