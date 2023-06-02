import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddToList } from '../../Functions/UserLists/AddToList';
import { SetList } from '../../Store/Slices/ListSlice';
import { GetSingleAnime } from '../../Functions/AnimeData.ts/GetSingleAnime';
import { ListStackImage } from './ListStackImage';

type Props = {
	List: any;
	ListName: string;
	Creator: string;
	Add: boolean;
};

const EmptyListStack = ({ List, ListName, Creator, Add }: Props) => {
	const StoreID = useSelector((state: any) => state.IDState);
	const [Anime, setAnime] = useState();
	const navigate = useNavigate();
	const dispatch = useDispatch();

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
					<ListStackImage Layer="Top" />
				</div>
				<div className="StackMiddleContainer">
					<ListStackImage Layer="Middle" />
				</div>
				<div className="StackBottomContainer">
					<ListStackImage Layer="Bottom" />
				</div>
			</div>
			<div>
				<p className="StackName">{ListName}</p>
				<p className="StackCreator">{Creator}</p>
				<p className="StackLength">Items: 0</p>
			</div>
		</div>
	);
};

export default EmptyListStack;
