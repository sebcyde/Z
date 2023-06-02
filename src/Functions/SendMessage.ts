import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	setDoc,
} from 'firebase/firestore';
import { db } from '../config/Firebase';
import { v4 as uuidv4 } from 'uuid';
// import { UpdateLastSeen } from './UpdateLastSeen';

export const SendMessage = async (
	LoggedInUser: string,
	RecievingUsers: string[],
	Message: string
) => {
	const UniqueMessageID = uuidv4();

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
				MessageID: UniqueMessageID,
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
					MessageID: UniqueMessageID,
				});
			})
		);
	}

	try {
		await AddToUserDB();
		await AddToRemainingDBs();
		// await UpdateLastSeen()
		console.log('Added to all DBs');
	} catch (error: any) {
		console.log(error.message);
	}
};
