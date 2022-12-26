import { getAuth } from 'firebase/auth';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';

export const UpdateLastSeen = async () => {
	const auth = getAuth();
	const user = auth.currentUser;
	await updateDoc(doc(db, `Users/${user?.uid}`), {
		LastSeen: serverTimestamp(),
	});
};
