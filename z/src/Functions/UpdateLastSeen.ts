import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';

export const UpdateLastSeen = async () => {
	const auth = getAuth();
	const user = auth.currentUser;
	await setDoc(
		doc(db, `Users/${user?.uid}`),
		{
			Timestamp: Date.now(),
		},
		{ merge: true }
	);
};
