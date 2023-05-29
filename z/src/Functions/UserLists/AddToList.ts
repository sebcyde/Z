import { getAuth } from 'firebase/auth';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import { Anime } from '../../Types/AnimeTypes';

export const AddToList = async (ListName: string, Anime: Anime) => {
	const auth = getAuth();
	const user = auth.currentUser;
	if (user) {
		const docRef = doc(db, `Users/${user.uid}/MoreInfo/Lists`);
		console.log('List Document:', docRef);
		await updateDoc(docRef, {
			[ListName]: {
				Updated: Date.now(),
				Anime: arrayUnion(Anime),
			},
		});
		console.log(`Added to ${ListName}`);
	}
};

// For Reference
// type AnimeList = {
// 	Name: string;
// 	Creator: string;
// 	Created: number;
// 	Updated: number;
// 	Anime: Anime[];
// };
