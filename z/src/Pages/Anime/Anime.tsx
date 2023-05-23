import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Jikan from '../../Components/Anime/Jikan';
import AnimeDetails from './AnimeDetails';
import LoadingScreen from '../LoadingScreen';
import { useNavigate } from 'react-router-dom';
import { Update } from '../../Store/Slices/AnimeSlice';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import axios from 'axios';
import '../../Styles/AnimeStyles.scss';
import Container from 'react-bootstrap/Container';
import TopPoster from '../../Components/Homepage/TopPoster';
import SearchNavComponent from '../../Components/Search/SearchNavComponent';

type Props = {};

function Anime({}: Props) {
	const StoreID = useSelector((state: any) => state.IDState);
	const [AnimeName, setAnimeName] = useState<string>('');
	const [Page, setPage] = useState(<Jikan />);
	const dispatch = useDispatch();

	return (
		<div className="page" style={{ overflowY: 'scroll' }}>
			{/* <TopPoster URL="https://api.jikan.moe/v4/seasons/now" /> */}
			<Jikan />
			<SearchNavComponent />
		</div>
	);
}

export default Anime;
