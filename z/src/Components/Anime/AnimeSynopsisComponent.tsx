import React, { useState } from 'react';

type Props = {
	Synopsis: string;
};

const AnimeSynopsisComponent = ({ Synopsis }: Props) => {
	const [ShowExcess, setShowExcess] = useState(false);
	return (
		<div className="SynopsisContainer">
			<p className={ShowExcess ? 'FullSynopsis' : 'ShortSynopsis'}>
				{Synopsis}
			</p>
			<button
				className="SynopsisMoreButton"
				onClick={() => setShowExcess(!ShowExcess)}
			>
				{ShowExcess ? 'View less' : 'Read More'}
			</button>
		</div>
	);
};

export default AnimeSynopsisComponent;
