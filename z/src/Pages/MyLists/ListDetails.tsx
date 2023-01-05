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
import BreadCrumbNavbar from '../../Components/Navbar/BreadcrumbNavbar';
import { useNavigate } from 'react-router-dom';

type Props = {};

const ListDetails = (props: Props) => {
	const ListState = useSelector((state: any) => state.ListState);
	const [CreatorDetails, setCreatorDetails] = useState<DocumentData>();
	const [Loading, setLoading] = useState(false);
	const ListName = ListState.ListName;
	const [user] = useAuthState(auth);
	const navigate = useNavigate();
	const List = ListState.List;

	const PullLists = async () => {
		if (user) {
			const userRef = doc(db, `Users/${user.uid}`);
			const userSnap = await getDoc(userRef);
			if (userSnap.exists()) {
				const Data = userSnap.data();
				setCreatorDetails(Data);
			} else {
				console.log('No such document!');
			}
		}
	};

	useEffect(() => {
		console.log(`Details for ${ListName}:`, List);
		PullLists().then(() => setLoading(false));
	}, []);

	const DeleteList = async (ListName: string) => {
		console.log('Deleting', ListName);
		setLoading(true);
		const DocRef = doc(db, `Users/${user!.uid}/MoreInfo`, 'Lists');
		if (ListName == 'Favourites') {
			// reset to empty but dont delete
			await setDoc(DocRef, { Favourites: [] }, { merge: true });
			// Startup();
		} else {
			// delete user made
			await updateDoc(DocRef, {
				[ListName]: deleteField(),
			});
			// Startup();
		}
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	};

	const NavigateEdit = () => navigate('/editlist');
	const NavigateRecommend = () => navigate('/recommend');
	const DeleteListCheck = () => {};

	return (
		<div className="ListDetailsPage">
			<BreadCrumbNavbar />
			{Loading || !CreatorDetails ? (
				<LoadingScreen />
			) : (
				<>
					<DetailsStack
						List={List}
						ListName={ListName}
						Creator={CreatorDetails.Username}
						CreatorImage={CreatorDetails.DisplayPicture}
					/>
					<div className="OptionsBar">
						<span>
							<DeleteIcon onClick={DeleteListCheck} />
							<EditIcon onClick={NavigateEdit} />
						</span>
						<span>
							{/* <LibraryAddIcon /> */}
							<SendIcon onClick={NavigateRecommend} />
						</span>
					</div>
					<div className="SearchResults">
						{List[ListName].map((ListItem: Anime) => {
							return <AnimeItem Anime={ListItem} />;
						})}
					</div>
				</>
			)}
		</div>
	);
};

export default ListDetails;
