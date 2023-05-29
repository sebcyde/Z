import { useEffect, useState } from 'react';
import { auth } from '../../config/Firebase.js';
import LoadingScreen from '../LoadingScreen';
import ListStack from '../../Components/Lists/ListStack.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import CreateListComponent from '../../Components/Lists/CreateListComponent.js';
import BreadCrumbNavbar from '../../Components/Navbar/BreadCrumbNavbar';
import { GetUserData } from '../../Functions/UserDetails/GetUserData.js';
import { GetUserLists } from '../../Functions/UserLists/GetUserLists.js';

function MyLists() {
	const [AllLists, setAllLists] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);
	const [UserName, setUserName] = useState('');
	const [user] = useAuthState(auth);

	const PullLists = async () => {
		if (user) {
			const UserData = await GetUserData(user.uid);
			const UserLists = await GetUserLists(user.uid);
			setUserName(UserData?.Username);

			if (UserLists) {
				setAllLists(UserLists);
			} else {
				console.log('User has no lists');
			}
		} else {
			console.log('User Not Found');
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
									Add={false}
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
