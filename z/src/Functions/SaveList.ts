import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';

export const SaveList = async (Item: any, ItemName: string) => {
	const auth = getAuth();
	const user = auth.currentUser;
	try {
		if (user) {
			const UserDB = doc(db, `Users/${user.uid}/MoreInfo/Lists`);
			await updateDoc(UserDB, {
				[ItemName]: Item,
			});
		}
		console.log(`Saved ${ItemName}`);
	} catch (error: any) {
		console.log(`Error ${error.code}:`, error.message);
	}
};
