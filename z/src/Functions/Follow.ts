import { getAuth } from 'firebase/auth';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';

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
