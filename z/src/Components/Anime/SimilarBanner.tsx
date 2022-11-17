import React, { useState } from 'react';
import LoadingScreen from '../../Pages/LoadingScreen';

type Props = {};

function SimilarBanner({}: Props) {
	const [Loading, setLoading] = useState<boolean>(true);
	return (
		<div
			style={{
				width: '100%',
				height: '100px',
				backgroundColor: 'green',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{Loading ? <LoadingScreen /> : <h1>Similar Banner</h1>}
		</div>
	);
}

export default SimilarBanner;
