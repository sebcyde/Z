import { getAuth } from 'firebase/auth';
import {
	arrayRemove,
	arrayUnion,
	doc,
	getDoc,
	updateDoc,
} from 'firebase/firestore';

import { db } from '../config/Firebase';
import { SendNotif } from './SendNotif';
import { UpdateLatestNotification } from './UpdateLastSeen';

export const Follow = async (UserAccount: any) => {
	const auth = getAuth();
	const user = auth.currentUser;
	console.log('Following:', UserAccount);
	if (user) {
		console.log('user:', user);
		const UserDB = doc(db, `Users/${user.uid}/MoreInfo/Friends`);

		await updateDoc(UserDB, {
			Following: arrayUnion(UserAccount.UID),
		});

		const QueryDB = doc(db, `Users/${UserAccount.UID}/MoreInfo/Friends`);
		await updateDoc(QueryDB, {
			Followers: arrayUnion(user.uid),
		});

		const UserDBInfo = doc(db, `Users/${user.uid}`);
		const docSnap = await getDoc(UserDBInfo);
		if (docSnap.exists()) {
			await SendNotif(
				UserAccount.UID,
				docSnap.data().Username,
				'Follow',
				docSnap.data().DisplayPicture
			);
			console.log('Notification sent.');
			console.log('User DB Data', docSnap.data());
		}

		await UpdateLatestNotification(UserAccount.UID);
		console.log('Successfully followed:', UserAccount);
	}
};

export const UnFollow = async (UserAccount: any) => {
	const auth = getAuth();
	const user = auth.currentUser;
	console.log('Unfollowing:', UserAccount);
	if (user) {
		console.log('user:', user);
		const UserDB = doc(db, `Users/${user.uid}/MoreInfo/Friends`);
		await updateDoc(UserDB, {
			Following: arrayRemove(UserAccount.UID),
		});

		const QueryDB = doc(db, `Users/${UserAccount.UID}/MoreInfo/Friends`);
		await updateDoc(QueryDB, {
			Followers: arrayRemove(user.uid),
		});
		console.log('Successfully unfollowed:', UserAccount);
	}
};
