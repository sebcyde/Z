import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Jikan from '../../API/Jikan';
import LoadingScreen from '../LoadingScreen';
import { useNavigate } from 'react-router-dom';
import { Update } from '../../Store/Slices/AnimeSlice';
import { useDispatch } from 'react-redux';

type Props = {};

function Anime({}: Props) {
	const [AnimeData, setAnimeData] = useState<any[]>([]);
	const [Loading, setLoading] = useState<boolean>(true);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const Pages: any[] = [];

	// const PullData = async (PageNumber: number | undefined) => {
	// 	let number = 1;
	// 	let Response = await Jikan(PageNumber);
	// 	for (let number = 1; number <= Response[1].last_visible_page; number++) {
	// 		Pages.push(
	// 			<Pagination.Item key={number} active={number === PageNumber}>
	// 				{number}
	// 			</Pagination.Item>
	// 		);
	// 	}

	// 	setAnimeData(Response);
	// 	setLoading(false);
	// };

	// useEffect(() => {
	// 	PullData(undefined);
	// }, []);

	// useEffect(() => {
	// 	PullData(PageNumber);
	// }, [PageNumber]);

	return (
		<div className="page" style={{ overflowY: 'scroll' }}>
			{/* {Loading ? <LoadingScreen /> : <Jikan />} */}
			<Jikan />
		</div>
	);
}

export default Anime;
