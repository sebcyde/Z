import { debounce } from 'lodash';
import React, {
	ChangeEvent,
	ChangeEventHandler,
	useCallback,
	useState,
} from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import SearchResults from '../../Components/Search/SearchResults';
import '../../Styles/Search.scss';

function Search() {
	const [SearchTerm, setSearchTerm] = useState<string | undefined>();
	const [SearchType, setSearchType] = useState<string>('anime');

	const InputHandler = (event: any) => {
		setSearchTerm(event.target.value);
	};

	const debouncedHandler = useCallback(debounce(InputHandler, 1500), []);

	return (
		<div className="SearchContainer">
			<Tabs
				defaultActiveKey="anime"
				id="tabParent"
				className="mb-3"
				onSelect={(k) => setSearchType(k!)}
			>
				<Tab eventKey="anime" title="Anime" />
				<Tab eventKey="manga" title="Manga" />
				<Tab eventKey="people" title="People" />
			</Tabs>
			<input
				placeholder="Search"
				className="SearchbarInput"
				onChange={debouncedHandler}
			/>
			<SearchResults Query={SearchTerm} SearchType={SearchType} />
		</div>
	);
}

export default Search;
