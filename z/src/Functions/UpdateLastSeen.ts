import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';

export const UpdateLastSeen = async (UserUId: string) => {
	await setDoc(
		doc(db, `Users/${UserUId}`),
		{
			Timestamp: Date.now(),
		},
		{ merge: true }
	);
};
