import { useEffect, useState } from 'react';
import { auth } from '../../config/Firebase.js';
import LoadingScreen from '../LoadingScreen.js';
import ListStack from '../../Components/Lists/ListStack.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import CreateListComponent from '../../Components/Lists/CreateListComponent.js';
import BreadCrumbNavbar from '../../Components/Navbar/BreadCrumbNavbar.js';
import { GetUserLists } from '../../Functions/UserLists/GetUserLists.js';
import { useSelector } from 'react-redux';
import EmptyListStack from '../../Components/Lists/EmptyListStack.js';

function MyLists() {
	const AddToList = useSelector((state: any) => state.IDState);
	const [Loading, setLoading] = useState<boolean>(true);
	const [AllLists, setAllLists] = useState<any>();
	const [user] = useAuthState(auth);

	const PullLists = async () => {
		console.log('Adding To List?', AddToList.id == 0 ? false : true);
		if (user) {
			const UserLists = await GetUserLists(user.uid);
			UserLists ? setAllLists(UserLists) : '';
			console.log('User Lists:', UserLists);
		}
	};

	useEffect(() => {
		PullLists().then(() => setLoading(false));
	}, []);

	return (
		<>
			<BreadCrumbNavbar />
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<CreateListComponent />
					{AllLists &&
						Object.keys(AllLists).map((ListName: any) => {
							const List = AllLists[ListName];
							console.log('List:', List);
							if (List.Anime.length < 1) {
								return (
									<EmptyListStack
										Add={AddToList.id == 0 ? false : true}
										List={List}
										ListName={List.Name}
										Creator={List.Creator}
									/>
								);
							} else {
								return (
									<ListStack
										Add={AddToList.id == 0 ? false : true}
										List={List}
										ListName={List.Name}
										Creator={List.Creator}
									/>
								);
							}
						})}
				</>
			)}
		</>
	);
}

export default MyLists;
