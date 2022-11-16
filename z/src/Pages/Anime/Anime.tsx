import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Jikan from '../../API/Jikan';
import AnimeDetails from './AnimeDetails';
import LoadingScreen from '../LoadingScreen';
import { useNavigate } from 'react-router-dom';
import { Update } from '../../Store/Slices/AnimeSlice';
import { useDispatch, useSelector } from 'react-redux';

type Props = {};

function Anime({}: Props) {
	const StoreID = useSelector((state: any) => state.IDState);
	const [Page, setPage] = useState(<Jikan />);

	useEffect(() => {
		if (StoreID.id === 0) {
			setPage(<Jikan />);
		} else {
			setPage(<AnimeDetails />);
		}
	}, [StoreID]);

	return (
		<div className="page" style={{ overflowY: 'scroll' }}>
			{Page}
		</div>
	);
}

export default Anime;
