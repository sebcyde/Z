import BreadCrumbNavbar from '../../Components/Navbar/BreadCrumbNavbar';
import { CreateList } from '../../Functions/UserLists/CreateList';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

type Props = {};

const CreateListPage = (props: Props) => {
	const [CreatingList, setCreatingList] = useState(false);
	const [NameInput, setNameInput] = useState<string>('');
	const navigate = useNavigate();

	const CreateListCallback = async () => {
		setCreatingList(true);
		await CreateList(NameInput);
		setCreatingList(false);
		navigate(-1);
	};

	// const PullRecommended = async () => {
	// 	const AnimeData = await GetPopularAnime();
	// 	console.log('Suggested Anime:', AnimeData.slice(0, 10));
	// 	AnimeData ? setSuggested(AnimeData.slice(0, 10)) : '';
	// };

	// useEffect(() => {
	// 	PullRecommended().then(() => setLoading(false));
	// }, []);

	return (
		<>
			<BreadCrumbNavbar />
			<div className="CreateListFormContainer">
				<h3>Give your new list a name</h3>
				<input
					type="text"
					value={NameInput}
					placeholder="List Name..."
					onChange={(e) => setNameInput(e.target.value)}
				/>
				<Button
					className="CreateListButton"
					onClick={CreateListCallback}
					variant="primary"
					disabled={CreatingList}
				>
					{CreatingList ? 'Creating' : 'Create List'}
				</Button>
			</div>
		</>
	);
};

export default CreateListPage;
