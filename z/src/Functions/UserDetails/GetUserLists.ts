import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';

export const GetUserLists = async (UID: string) => {
	const docRef = doc(db, `Users/${UID}/MoreInfo/Lists`);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		console.log('No List Document!');
	}
};
