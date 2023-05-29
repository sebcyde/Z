import { getAuth } from 'firebase/auth';
import { doc, updateDoc, arrayUnion, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import { Anime } from '../../Types/AnimeTypes';
import { GetUserData } from '../UserDetails/GetUserData';

export const AddToList = async (ListName: string, Anime?: Anime) => {
	const auth = getAuth();
	const user = auth.currentUser;
	if (user) {
		const docRef = doc(db, `Users/${user.uid}/MoreInfo/Lists`);
		if (Anime) {
			const docSnap = await getDoc(docRef);
			const existingData = docSnap.data();
			if (existingData) {
				await updateDoc(docRef, {
					[ListName]: {
						...existingData[ListName],
						Updated: Date.now(),
						Anime: arrayUnion(Anime),
					},
				});
			}
			console.log(`Added to ${ListName}`);
		} else {
			await setDoc(
				docRef,
				{
					[ListName]: {
						Name: ListName,
						Creator: user.uid,
						Created: Date.now(),
						Updated: Date.now(),
						Anime: [],
					},
				},
				{ merge: true }
			);
			console.log(`Created ${ListName}`);
		}
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
