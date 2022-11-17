import axios from 'axios';
import React, { useEffect } from 'react';
import ForYouCarousel from './ForYouCarousel';

type Props = {};

function ForYou({}: Props) {
	// useEffect(() => {
	// 	axios.get('https://api.jikan.moe/v4/seasons/upcoming').then((response) => {
	// 		console.log(response.data);
	// 	});
	// }, []);

	return (
		<div>
			<h2>Top Picks For You</h2>
			<ForYouCarousel />
		</div>
	);
}

export default ForYou;
