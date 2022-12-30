import { getAuth } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';

export const UpdateLastSeen = async (UserUId: string) => {
	const userRef = doc(db, `Users/${UserUId}`);
	await updateDoc(userRef, { LastSeen: Date.now() });
	console.log('Last Seen:', Date.now());
	console.log('User Last Seen Updated.');
};

export const UpdateLatestNotification = async (UserUId: string) => {
	const userRef = doc(db, `Users/${UserUId}`);
	await updateDoc(userRef, { LatestNotification: Date.now() });
	console.log('Latest Notification:', Date.now());
	console.log('User Latest Notification Updated.');
};
