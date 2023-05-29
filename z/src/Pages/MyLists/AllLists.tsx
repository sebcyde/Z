import { useEffect, useState } from 'react';
import { auth } from '../../config/Firebase.js';
import LoadingScreen from '../LoadingScreen.js';
import ListStack from '../../Components/Lists/ListStack.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import CreateListComponent from '../../Components/Lists/CreateListComponent.js';
import BreadCrumbNavbar from '../../Components/Navbar/BreadCrumbNavbar.js';
import { GetUserData } from '../../Functions/UserDetails/GetUserData.js';
import { GetUserLists } from '../../Functions/UserLists/GetUserLists.js';
import { useSelector } from 'react-redux';

function MyLists() {
	const AddToList = useSelector((state: any) => state.IDState);
	const [Loading, setLoading] = useState<boolean>(true);
	const [AllLists, setAllLists] = useState<any>();
	const [UserName, setUserName] = useState('');
	const [user] = useAuthState(auth);

	const PullLists = async () => {
		console.log('Adding To List?', AddToList.id == 0 ? false : true);
		if (user) {
			const UserLists = await GetUserLists(user.uid);
			const UserData = await GetUserData(user.uid);
			UserLists ? setAllLists(UserLists) : '';
			setUserName(UserData?.Username);
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
							return (
								<ListStack
									Add={AddToList.id == 0 ? false : true}
									List={AllLists}
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
