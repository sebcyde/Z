import axios, { AxiosResponse } from 'axios';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import CreateListComponent from '../../Components/Lists/CreateListComponent';
import ListStack from '../../Components/Lists/ListStack';
import NoListsComponent from '../../Components/Lists/NoListsComponent';
import BreadCrumbNavbar from '../../Components/Navbar/BreadCrumbNavbar';
import { auth, db } from '../../config/Firebase';
import { Anime } from '../../Types/AnimeTypes';
import LoadingScreen from '../LoadingScreen';

const AddToList = () => {
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
				console.log('No List Document!');
			}
		}
	};

	useEffect(() => {
		PullLists().then(() => setLoading(false));
	}, []);

	return (
		<>
			<BreadCrumbNavbar />
			<h1>Add To List</h1>
			{Loading || !ListStackLists ? (
				<LoadingScreen />
			) : ListStackLists.length < 1 ? (
				<>
					<CreateListComponent />
					<NoListsComponent />
				</>
			) : (
				<>
					<CreateListComponent />
					{Object.keys(ListStackLists).map((ListName: any) => {
						return (
							<ListStack
								Add
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
};

export default AddToList;
