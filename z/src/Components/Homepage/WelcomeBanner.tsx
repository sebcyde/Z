import React from 'react';

type Props = {};

function WelcomeBanner({}: Props) {
	return (
		<div
			style={{
				backgroundColor: 'crimson',
				width: '100%',
				textAlign: 'center',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '50px',
			}}
		>
			<h3>Welcome to Version 1 of Z!</h3>
		</div>
	);
}

export default WelcomeBanner;
