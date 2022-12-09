import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '../config/Firebase';

const auth = getAuth();
const user = auth.currentUser;

export const PullLists = async () => {
	const docRef = doc(db, `Users/${user?.uid}/MoreInfo/Lists`);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		const Lists = docSnap.data();
		console.log('DB Lists:', Lists);
		return Lists;
	} else {
		console.log('No Lists Available!');
	}
};

export const PullUser = async () => {
	if (user) {
		console.log('Current User:', user);
	} else {
		console.log('No User Available!');
	}
};
