import { debounce } from '@mui/material';
import UserSearch from '../../Components/Messages/UserSearch';
import { useState, useRef, useCallback, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function NewChat() {
	const [SearchTerm, setSearchTerm] = useState<string>('');
	const navigate = useNavigate();
	const SearchInput = useRef(null);

	const InputHandler = (event: any) => {
		setSearchTerm(event.target.value);
	};

	const debouncedHandler = useCallback(debounce(InputHandler, 1000), []);

	const NewChatBanner = () => {
		return (
			<div className="CreateChatBanner">
				<span onClick={() => navigate('/allchats')}>
					<ArrowBackIcon />
					<p>Back</p>
				</span>
				<input
					placeholder="Search"
					className="SearchbarInput"
					ref={SearchInput}
					defaultValue={SearchTerm}
					onChange={debouncedHandler}
				/>
			</div>
		);
	};

	useEffect(() => {
		console.log('Search Term:', SearchTerm);
	}, [SearchTerm]);

	return (
		<div className="AllChatsContainer">
			<NewChatBanner />
			<UserSearch Query={SearchTerm} />
		</div>
	);
}

export default NewChat;
