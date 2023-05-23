import { DocumentData, doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';

export const GetUserData = async (
	UID: string
): Promise<DocumentData | undefined> => {
	const docRef = doc(db, `Users/${UID}`);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		console.log('Deets:', docSnap.data());
		return docSnap.data();
	} else {
		console.log('No such document!');
	}
};
