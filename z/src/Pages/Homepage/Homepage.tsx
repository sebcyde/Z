import React from 'react';
import UpcomingCarousel from '../../Components/Homepage/UpcomingCarousel';
import ForYou from '../../Components/Homepage/ForYou';
import WelcomeBanner from '../../Components/Homepage/WelcomeBanner';

type Props = {};

function Homepage({}: Props) {
	return (
		<div className="page">
			<WelcomeBanner />
			<UpcomingCarousel />
			<ForYou />
		</div>
	);
}

export default Homepage;
