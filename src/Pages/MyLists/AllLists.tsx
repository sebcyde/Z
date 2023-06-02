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
import { AnimeList } from '../../Types/AnimeTypes.js';
import { GetUserData } from '../../Functions/UserDetails/GetUserData.js';

function MyLists() {
	const AddToList = useSelector((state: any) => state.IDState);
	const [UserName, setUserName] = useState('');
	const [Loading, setLoading] = useState<boolean>(true);
	const [AllLists, setAllLists] = useState<any>();
	const [user] = useAuthState(auth);

	const PullLists = async () => {
		console.log('Adding To List?', AddToList.id == 0 ? false : true);
		if (user) {
			let UserLists = await GetUserLists(user.uid);
			let UserData = await GetUserData(user.uid);

			UserData ? setUserName(UserData.Username) : '';
			UserLists ? setAllLists(UserLists) : '';
		}
	};

	useEffect(() => {
		PullLists().then(() => setLoading(false));
	}, []);

	useEffect(() => {
		console.log('Store ID:', AddToList.id);
	}, [AddToList.id]);

	return (
		<>
			<BreadCrumbNavbar />
			{Loading ? (
				<LoadingScreen />
			) : (
				<div className="ParentListContainer">
					<CreateListComponent />
					{AllLists &&
						AllLists.map((List: AnimeList) => {
							console.log('List:', List);
							if (List.Anime.length < 1) {
								return (
									<EmptyListStack
										Add={AddToList.id == 0 ? false : true}
										List={List}
										ListName={List.Name}
										Creator={UserName}
									/>
								);
							} else {
								return (
									<ListStack
										Add={AddToList.id == 0 ? false : true}
										List={List}
										ListName={List.Name}
										Creator={UserName}
									/>
								);
							}
						})}
				</div>
			)}
		</>
	);
}

export default MyLists;
