import React from 'react';

type Props = {};

function WelcomeBanner({}: Props) {
	return (
		<div
			style={{
				backgroundColor: 'tomato',
				width: '100%',
				textAlign: 'center',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '40px',
			}}
		>
			<h4 style={{ margin: '0px' }}>Welcome to Version 1 of Z!</h4>
		</div>
	);
}

export default WelcomeBanner;
