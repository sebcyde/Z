import {
	deleteField,
	doc,
	DocumentData,
	getDoc,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import AnimeItem from '../../Components/Anime/AnimeItem';
import DetailsStack from '../../Components/Lists/DetailsStack';
import { auth, db } from '../../config/Firebase';
import { Anime } from '../../Types/AnimeTypes';
import LoadingScreen from '../LoadingScreen';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import BreadCrumbNavbar from '../../Components/Navbar/BreadCrumbNavbar';
import { useNavigate } from 'react-router-dom';
import { GetUserData } from '../../Functions/UserDetails/GetUserData';
import { DeleteList } from '../../Functions/UserLists/DeleteList';
import EmptyDetailsStack from '../../Components/Lists/EmptyDetailsStack';

const ListDetails = () => {
	const [CreatorDetails, setCreatorDetails] = useState<DocumentData>();
	const ListState = useSelector((state: any) => state.ListState);
	const [Loading, setLoading] = useState(false);
	const ListName = ListState.ListName;
	const [user] = useAuthState(auth);
	const navigate = useNavigate();
	const List = ListState.List;

	// Navigation
	const NavigateRecommend = () => navigate('/recommend');
	const NavigateEdit = () => navigate('/editlist');

	const PullData = async () => {
		if (user) {
			const UserData = await GetUserData(user.uid);
			console.log('User Data:', UserData);
			setCreatorDetails(UserData);
		}
		console.log('List:', List);
	};

	const DeleteListCheck = async (ListName: string) => {
		if (user) {
			await DeleteList(user.uid, ListName);
		}
	};

	const ListItems = List.Anime.map((ListItem: Anime) => {
		return <AnimeItem Anime={ListItem} />;
	});

	useEffect(() => {
		PullData().then(() => setLoading(false));
	}, []);

	return (
		<div className="ListDetailsPage">
			<BreadCrumbNavbar />
			{Loading || !CreatorDetails ? (
				<LoadingScreen />
			) : (
				<>
					{List.Anime.length > 0 ? (
						<DetailsStack
							List={List}
							ListName={ListName}
							Creator={CreatorDetails.Username}
							CreatorImage={CreatorDetails.DisplayPicture}
						/>
					) : (
						<EmptyDetailsStack
							ListName={ListName}
							Creator={CreatorDetails.Username}
							CreatorImage={CreatorDetails.DisplayPicture}
						/>
					)}
					<div className="OptionsBar">
						<span>
							<DeleteIcon onClick={() => DeleteListCheck(ListName)} />
							<EditIcon onClick={NavigateEdit} />
						</span>
						<span>
							<SendIcon onClick={NavigateRecommend} />
						</span>
					</div>
					<div className="SearchResults">{ListItems}</div>
				</>
			)}
		</div>
	);
};

export default ListDetails;
