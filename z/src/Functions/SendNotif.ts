import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/Firebase';

export const SendNotif = async (
	RecieverUID: string,
	SenderUserName: string,
	Type: string,
	Image: string
) => {
	console.log('Reciever:', RecieverUID);
	console.log('Sender:', SenderUserName);
	console.log('Type:', Type);
	console.log('Image:', Image);

	const docRef = doc(db, `Users/${RecieverUID}/Notifications/AllNotifications`);
	await setDoc(
		docRef,
		{
			Notif: arrayUnion({
				Time: Date.now(),
				Type: Type,
				Image: Image,
				Username: SenderUserName,
			}),
		},
		{ merge: true }
	);
};
