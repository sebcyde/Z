import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase.js';
import { getAuth } from 'firebase/auth';
import LoadingScreen from '../LoadingScreen';

function MyLists() {
	const [Loading, setLoading] = useState<boolean>(true);
	const [RawUserLists, setRawUserLists] = useState<any[]>([]);
	const [UserLists, setUserLists] = useState<any[]>([]);

	const PullFavourites = async () => {
		const auth = getAuth();
		const user = auth.currentUser;
		if (user) {
			const docRef = doc(db, `Users/${user.uid}`);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				const Lists = data.UserLists;
				console.log('Lists:', Lists);
				return Lists;
			} else {
				console.log('No such document!');
			}
		}
	};

	useEffect(() => {
		PullFavourites()
			.then((Lists) => {
				setRawUserLists(Lists);
			})
			.then(() => {
				const Key1 = Object.keys(RawUserLists);
				const Value1 = Object.values(RawUserLists);

				console.log('Keys:', Key1);
				console.log('Values:', Value1);
				// for (let List in RawUserLists) {
				// 	setUserLists([...UserLists, []]);
				// }
				// console.log(List);
				// setUserLists([...UserLists, List]);
			})
			.then(() => {
				setLoading(false);
				console.log(UserLists);
			});
	}, []);

	return (
		<div style={{ width: '100%', height: '100%' }}>
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					{UserLists.map((List) => {
						return (
							<div
								style={{
									width: '100%',
									height: 'fit-content',
									overflowX: 'scroll',
								}}
							></div>
						);
					})}
				</>
			)}
		</div>
	);
}

export default MyLists;
