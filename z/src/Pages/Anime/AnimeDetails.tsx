import { Update } from '../../Store/Slices/AnimeSlice';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import SimilarBanner from '../../Components/Anime/SimilarBanner';

type Props = {};

function AnimeDetails({}: Props) {
	const StoreID = useSelector((state: any) => state.IDState);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log(StoreID);
	}, [StoreID]);

	const ResetID = () => {
		dispatch(Update(0));
	};

	const PopulateDetails = async () => {
		const Response = await axios.get(
			`https://api.jikan.moe/v4/anime/${StoreID.id}/full`
		);
		const Data = Response.data.data;
		console.log(Data);
	};

	// useEffect(() => {
	// 	PopulateDetails();
	// }, []);

	return (
		<div className="page" style={{ overflowY: 'scroll' }}>
			<SimilarBanner />
			<Button onClick={ResetID}>Reset ID</Button>
		</div>
	);
}

export default AnimeDetails;
