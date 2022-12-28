import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/Firebase';

export const SendNotif = async (
	Reciever: string,
	Sender: string,
	Type: string,
	Image: string
) => {
	const docRef = doc(db, `Users/${Reciever}/Notifications/AllNotifications`);
	await setDoc(
		docRef,
		{
			Notif: arrayUnion({
				Time: Date.now(),
				Type: Type,
				Image: Image,
				Username: Sender,
			}),
		},
		{ merge: true }
	);
};
