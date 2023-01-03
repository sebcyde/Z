import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../config/Firebase.js';
import LoadingScreen from '../LoadingScreen';
import ListStack from '../../Components/Lists/ListStack.js';
import { useAuthState } from 'react-firebase-hooks/auth';

function MyLists() {
	const [ListStackLists, setListStackLists] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);
	const [UserName, setUserName] = useState('');
	const [user] = useAuthState(auth);

	const PullLists = async () => {
		if (user) {
			const userRef = doc(db, `Users/${user.uid}`);
			const userSnap = await getDoc(userRef);
			const docRef = doc(db, `Users/${user.uid}/MoreInfo/Lists`);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists() && userSnap.exists()) {
				const User = userSnap.data().Username;
				const Lists = docSnap.data();
				const sorted = Object.keys(Lists!)
					.sort()
					.reduce((accumulator: any, key) => {
						accumulator[key] = Lists![key];
						return accumulator;
					}, {});
				setListStackLists(sorted);
				setUserName(User);
			} else {
				console.log('No such document!');
			}
		}
	};

	useEffect(() => {
		PullLists().then(() => setLoading(false));
	}, []);

	return (
		<>
			{Loading || !ListStackLists ? (
				<LoadingScreen />
			) : (
				<>
					{Object.keys(ListStackLists).map((ListName: any) => {
						return (
							<ListStack
								List={ListStackLists}
								ListName={ListName}
								Creator={UserName}
							/>
						);
					})}
				</>
			)}
		</>
	);
}

export default MyLists;
