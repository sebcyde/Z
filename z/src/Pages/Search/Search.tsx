import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import SearchResults from '../../Components/Search/SearchResults';
import '../../Styles/Search.scss';

type Props = {};

function Search({}: Props) {
	const InputHandler = (e: React.FormEvent<HTMLInputElement>) => {
		setSearchTerm(e.currentTarget.value);
	};

	const [SearchTerm, setSearchTerm] = useState<string | undefined>();
	return (
		<div>
			<div className="SearchbarContainer">
				<h3 className="SearchbarHeader">Search hundreds of titles</h3>
				<input
					placeholder="Search"
					className="SearchbarInput"
					onChange={(e) => {
						InputHandler(e);
					}}
				/>
			</div>
			<SearchResults Query={SearchTerm} />
		</div>
	);
}

export default Search;
