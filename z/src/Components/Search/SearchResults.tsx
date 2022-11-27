import React, { useEffect, useRef, useState } from 'react';

type Props = { Query: string | undefined; SearchType: string };

function SearchResults({ Query, SearchType }: Props) {
	const Search = async (SearchType: string) => {
		`https://api.jikan.moe/v4/anime&q=${SearchType}`;
	};

	useEffect(() => {
		console.log(SearchType);
	}, [SearchType]);

	useEffect(() => {
		console.log(Query);
	}, [Query]);

	return (
		<div>
			<h2>{Query}</h2>
			<h2>{SearchType}</h2>
		</div>
	);
}

export default SearchResults;
