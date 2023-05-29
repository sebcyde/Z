import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';

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

// export const AddToList = async (ListName: string, Anime: Anime) => {
// 	const auth = getAuth();
// 	const user = auth.currentUser;
// 	if (user) {
// 		const docRef = doc(db, `Users/${user.uid}/MoreInfo/Lists`);
// 		await updateDoc(docRef, {
// 			[ListName]: {
// 				Updated: serverTimestamp(),
// 				Anime: arrayUnion(Anime),
// 			},
// 		});
// 		console.log(`Added to ${ListName}`);
// 	}
// };

// For Reference
// type AnimeList = {
// 	Name: string;
// 	Creator: string;
// 	Created: number;
// 	Updated: number;
// 	Anime: Anime[];
// };
