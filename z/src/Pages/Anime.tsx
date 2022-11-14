import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Jikan } from '../API/Jikan';

type Props = {};

function Anime({}: Props) {
	const [AnimeData, setAnimeData] = useState<any[]>([]);
	const PullData = async () => {
		let Response = await Jikan();
		setAnimeData(Response[0]);
	};

	useEffect(() => {
		PullData();
	}, []);

	return (
		<div className="page" style={{ overflowY: 'scroll' }}>
			<Button
				variant="primary"
				onClick={PullData}
				style={{ position: 'fixed', bottom: '0px', margin: 'auto 0px' }}
			>
				Pull Data
			</Button>
			{AnimeData}
		</div>
	);
}

export default Anime;
