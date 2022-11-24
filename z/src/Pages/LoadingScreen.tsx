import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

type Props = {};

function LoadingScreen({}: Props) {
	return (
		<div className="page flex justcenter aligncenter">
			<FadeLoader color={'rgb(194, 87, 0)'} aria-label="Loading Spinner" />
		</div>
	);
}

export default LoadingScreen;
