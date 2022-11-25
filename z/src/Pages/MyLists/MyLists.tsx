import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase.js';
import { getAuth } from 'firebase/auth';
import LoadingScreen from '../LoadingScreen';
import { useDispatch } from 'react-redux';
import { Update } from '../../Store/Slices/AnimeSlice.js';

function MyLists() {
	const [Loading, setLoading] = useState<boolean>(true);
	const [UserLists, setUserLists] = useState<any[]>([]);
	const [Loading2, setLoading2] = useState<boolean>(true);
	const dispatch = useDispatch();

	const NavigateAnimePage = async (ID: number) => {
		dispatch(Update(ID));
	};

	const PullFavourites = async () => {
		const auth = getAuth();
		const user = auth.currentUser;
		if (user) {
			const docRef = doc(db, `Users/${user.uid}/MoreInfo`, 'Lists');
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				console.log('data:', data);
				return data;
			} else {
				console.log('No such document!');
			}
		}
	};
	useEffect(() => {
		PullFavourites()
			.then((data) => {
				const sorted = Object.keys(data!)
					.sort()
					.reduce((accumulator, key) => {
						accumulator[key] = data![key];
						return accumulator;
					}, {});
				console.log('Sorted:', sorted);
				return sorted;
			})
			.then((data) => {
				setLoading2(false);
				console.log('Raw data:', data);
				const ListNames = Object.keys(data!);
				const ListValues: any = Object.values(data!);
				console.log('List Names:', ListNames);
				console.log('List Values:', ListValues);

				setUserLists(
					ListNames.map((List: string, index: number) => {
						return (
							<div className="ListContainer" key={index}>
								<h2>{List}</h2>
								<div>
									{ListValues[index].map((ListValue: any, index2: number) => {
										return (
											<div
												key={index2}
												className="AnimeListContainer"
												onClick={() => {
													NavigateAnimePage(ListValue.mal_id);
												}}
											>
												<img src={ListValue.images.jpg.image_url} />
												<div className="AnimeListDetailsContainer">
													<h3 className="AnimeListTitle">{ListValue.title}</h3>
													<span className="AnimeListGenres">
														<p>{ListValue.genres[0].name}</p>
														<p>{ListValue.genres[1].name}</p>
													</span>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						);
					})
				);
			})
			.then(() => {
				setLoading(false);
			});
	}, []);

	return (
		<div style={{ width: '100%', height: '100%' }}>
			{Loading ? <LoadingScreen /> : <>{UserLists.map((List) => List)}</>}
		</div>
	);
}

export default MyLists;
