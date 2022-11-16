import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

type Props = {};

function AnimeDetails({}: Props) {
	const IDState = useSelector((state: any) => state.IDState);

	useEffect(() => {
		console.log(IDState);
	}, [IDState]);

	return <div>AnimeDetails</div>;
}

export default AnimeDetails;
