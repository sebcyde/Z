import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddToList } from '../../Functions/AddToList';
import { SetList } from '../../Store/Slices/ListSlice';

type Props = {
	List: any;
	ListName: string;
	Creator: string;
	Add: boolean;
};

const ListStack = ({ List, ListName, Creator, Add }: Props) => {
	const StoreID = useSelector((state: any) => state.IDState);
	const [Anime, setAnime] = useState();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		axios
			.get(`https://api.jikan.moe/v4/anime/${StoreID.id}/full`)
			.then((Response: AxiosResponse) => {
				const Data = Response.data.data;
				return Data;
			})
			.then((Data) => {
				console.log('Anime Data:', Data);
				setAnime(Data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [StoreID]);

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
						src={List[ListName][0].images.jpg.large_image_url}
					/>
				</div>
				<div className="StackMiddleContainer">
					<img
						className="StackMiddle"
						src={List[ListName][0].images.jpg.large_image_url}
					/>
				</div>
				<div className="StackBottomContainer">
					<img
						className="StackBottom"
						src={List[ListName][0].images.jpg.large_image_url}
					/>
				</div>
			</div>
			<div>
				<p className="StackName">{ListName}</p>
				<p className="StackCreator">{Creator}</p>
				<p className="StackLength">Items: {List[ListName].length}</p>
			</div>
		</div>
	);
};

export default ListStack;
