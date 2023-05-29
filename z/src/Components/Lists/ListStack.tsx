import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddToList } from '../../Functions/UserLists/AddToList';
import { SetList } from '../../Store/Slices/ListSlice';
import { GetSingleAnime } from '../../Functions/AnimeData.ts/GetSingleAnime';

type Props = {
	List: any;
	ListName: string;
	Creator: string;
	Add: boolean;
};

const ListStack = ({ List, ListName, Creator, Add }: Props) => {
	const StoreID = useSelector((state: any) => state.IDState);
	const ListFirstAnime = List[ListName].Anime[0];
	const [Anime, setAnime] = useState();
	const ListInfo = List[ListName];
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// console.log('List:', List);
	// console.log('ListName:', ListName);
	// console.log('List Info:', ListInfo);
	// console.log('List First Anime:', ListFirstAnime);

	const PullAnimeData = async () => {
		const AnimeData = await GetSingleAnime(StoreID.id);
		console.log('Anime Data:', AnimeData);
		setAnime(AnimeData);
	};

	useEffect(() => {
		Add ? PullAnimeData() : '';
	}, []);

	const NavigateToList = () => {
		dispatch(SetList({ List: List, ListName: ListName }));
		navigate('/listdetails');
	};

	const AddToListCallback = async () => {
		await AddToList(ListName, Anime!);
		navigate(-1);
	};

	return (
		<div
			className="ListStackContainer"
			onClick={Add ? AddToListCallback : NavigateToList}
		>
			<div>
				<div className="StackTopContainer">
					<img
						className="StackTop"
						src={ListFirstAnime.images.jpg.large_image_url}
					/>
				</div>
				<div className="StackMiddleContainer">
					<img
						className="StackMiddle"
						src={ListFirstAnime.images.jpg.large_image_url}
					/>
				</div>
				<div className="StackBottomContainer">
					<img
						className="StackBottom"
						src={ListFirstAnime.images.jpg.large_image_url}
					/>
				</div>
			</div>
			<div>
				<p className="StackName">{ListName}</p>
				<p className="StackCreator">{Creator}</p>
				<p className="StackLength">Items: {ListInfo.Anime.length}</p>
			</div>
		</div>
	);
};

export default ListStack;
