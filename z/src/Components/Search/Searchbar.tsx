import React from 'react';

type Props = {};

function Searchbar({}: Props) {
	return (
		<div className="SearchbarContainer">
			<h3 className="SearchbarHeader">Search hundreds of titles</h3>
			<input placeholder="Search" className="SearchbarInput" />
		</div>
	);
}

export default Searchbar;
