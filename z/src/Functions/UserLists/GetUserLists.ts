import { DocumentData, doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';

const EmptObjectCheck = (obj: object): boolean => {
	return Object.keys(obj).length === 0;
};

export const GetUserLists = async (UID: string) => {
	const docRef = doc(db, `Users/${UID}/MoreInfo/Lists`);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists() && !EmptObjectCheck(docSnap.data())) {
		console.log('Raw List Data:', docSnap.data());
		return docSnap.data();
	} else if (docSnap.exists() && EmptObjectCheck(docSnap.data())) {
		return null;
	} else {
		console.log('No List Document!');
	}
};
