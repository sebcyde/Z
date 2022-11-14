import React from 'react';
import ClockLoader from 'react-spinners/ClockLoader';

type Props = {};

function LoadingScreen({}: Props) {
	return (
		<div className="page flex justcenter aligncenter">
			<ClockLoader color={'#8d99ae'} size={50} aria-label="Loading Spinner" />
		</div>
	);
}

export default LoadingScreen;
