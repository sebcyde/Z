import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';

export const GetUserFriends = async (UID: string) => {
	const UserConnectionsRef = doc(db, `Users/${UID}/MoreInfo/Friends`);
	const UserConnectionsSnap = await getDoc(UserConnectionsRef);
	if (UserConnectionsSnap.exists()) {
		console.log('User Friends:', UserConnectionsSnap.data());
		return UserConnectionsSnap.data();
	} else {
		console.log('Failed to retrieve users friends details');
	}
};
