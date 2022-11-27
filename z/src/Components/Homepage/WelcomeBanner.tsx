import React from 'react';
import { Link } from 'react-router-dom';

function WelcomeBanner() {
	return (
		<div
			style={{
				backgroundColor: 'rgb(194, 87, 0)',
				width: '100%',
				textAlign: 'center',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '40px',
			}}
		>
			<h4 style={{ margin: '0px', fontSize: '18px' }}>
				You can now view people! Click{' '}
				<Link to={'people'} style={{ color: 'white' }}>
					here
				</Link>
			</h4>
		</div>
	);
}

export default WelcomeBanner;
