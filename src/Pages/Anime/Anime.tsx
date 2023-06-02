import { useState } from 'react';
import Jikan from '../../Components/Anime/Jikan';
import { useDispatch, useSelector } from 'react-redux';
import '../../Styles/AnimeStyles.scss';
import SearchNavComponent from '../../Components/Search/SearchNavComponent';

type Props = {};

function Anime({}: Props) {
	// const StoreID = useSelector((state: any) => state.IDState);
	// const [AnimeName, setAnimeName] = useState<string>('');
	// const [Page, setPage] = useState(<Jikan />);

	return (
		<div className="page" style={{ overflowY: 'scroll' }}>
			{/* <TopPoster URL="https://api.jikan.moe/v4/seasons/now" /> */}
			<Jikan />
			<SearchNavComponent />
		</div>
	);
}

export default Anime;
