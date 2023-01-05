import { getAuth } from 'firebase/auth';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../config/Firebase';
import { Anime } from '../Types/AnimeTypes';

export const AddToList = async (ListName: string, Anime: Anime) => {
	const auth = getAuth();
	const user = auth.currentUser;
	if (user) {
		const docRef = doc(db, `Users/${user.uid}/MoreInfo/Lists`);
		await updateDoc(docRef, {
			[ListName]: arrayUnion(Anime),
		});
		console.log(`Added to ${ListName}`);
	}
};
