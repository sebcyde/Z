import { debounce } from 'lodash';
import React, {
	ChangeEvent,
	ChangeEventHandler,
	useCallback,
	useRef,
	useState,
} from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import SearchResults from '../../Components/Search/SearchResults';
import SearchIcon from '@mui/icons-material/Search';
import '../../Styles/Search.scss';

function Search() {
	const [SearchTerm, setSearchTerm] = useState<string | undefined>();
	const [SearchType, setSearchType] = useState<string>('anime');
	const SearchInput = useRef(null);

	const InputHandler = (event: any) => {
		setSearchTerm(event.target.value);
	};

	const TabSelect = (k: string | null) => {
		setSearchType(k!);
		setSearchTerm('');
		// SearchInput.current!.value = '';
	};

	const debouncedHandler = useCallback(debounce(InputHandler, 1000), []);

	return (
		<div className="SearchContainer">
			<div className="SearchbarInputContainer">
				<input
					placeholder="Search"
					className="SearchbarInput"
					ref={SearchInput}
					value={SearchTerm}
					onChange={debouncedHandler}
				/>
			</div>
			<Tabs defaultActiveKey="anime" id="tabParent" onSelect={TabSelect}>
				<Tab eventKey="anime" title="Anime" />
				<Tab eventKey="manga" title="Manga" />
				<Tab eventKey="people" title="People" />
			</Tabs>

			<SearchResults Query={SearchTerm} SearchType={SearchType} />
		</div>
	);
}

export default Search;
