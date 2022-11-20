import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Update } from '../../Store/Slices/AnimeSlice';
import Pagination from 'react-bootstrap/Pagination';
import LoadingScreen from '../../Pages/LoadingScreen';
import { Col } from 'react-bootstrap';
import AnimeListBanner from './AnimeListBanner';

function Jikan() {
	const dispatch = useDispatch();

	return (
		<div>
			<AnimeListBanner
				URL="https://api.jikan.moe/v4/top/anime"
				Title="Top Anime"
			/>
			<AnimeListBanner
				URL="https://api.jikan.moe/v4/seasons/upcoming"
				Title="Upcoming Anime"
			/>
			<AnimeListBanner
				URL="https://api.jikan.moe/v4/seasons/now"
				Title="Current Season"
			/>
		</div>
	);
}

export default Jikan;
