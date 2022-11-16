import { Update } from '../../Store/Slices/AnimeSlice';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

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

	return (
		<div className="page" style={{ overflowY: 'scroll' }}>
			AnimeDetails
			<Button onClick={ResetID}>Reset ID</Button>
		</div>
	);
}

export default AnimeDetails;
