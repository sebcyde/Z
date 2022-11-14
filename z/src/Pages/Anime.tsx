import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Jikan } from '../API/Jikan';
import LoadingScreen from '../Pages/LoadingScreen';

type Props = {};

function Anime({}: Props) {
	const [AnimeData, setAnimeData] = useState<any[]>([]);
	const [Loading, setLoading] = useState<boolean>(true);
	const PullData = async () => {
		let Response = await Jikan();
		setAnimeData(Response[0]);
		setLoading(false);
	};

	useEffect(() => {
		PullData();
	}, []);

	return (
		<div className="page" style={{ overflowY: 'scroll' }}>
			{Loading ? <LoadingScreen /> : AnimeData}
		</div>
	);
}

export default Anime;
