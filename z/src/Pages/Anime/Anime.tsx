import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Jikan from '../../API/Jikan';
import AnimeDetails from './AnimeDetails';
import LoadingScreen from '../LoadingScreen';
import { useNavigate } from 'react-router-dom';
import { Update } from '../../Store/Slices/AnimeSlice';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import axios from 'axios';

type Props = {};

const AnimeNameStyle = {
	maxWidth: '150px',
	boxSizing: 'border-box',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	wordWrap: 'normal',
};

function Anime({}: Props) {
	const StoreID = useSelector((state: any) => state.IDState);
	const [AnimeName, setAnimeName] = useState<string>('');
	const [Page, setPage] = useState(<Jikan />);
	const dispatch = useDispatch();

	const UpdateNames = async () => {
		const GetName = await axios.get(
			`https://api.jikan.moe/v4/anime/${StoreID.id}/full`
		);
		setAnimeName(GetName.data.data.title);
		setPage(<AnimeDetails />);
	};

	const Reset = async () => {
		dispatch(Update(0));
		setPage(<Jikan />);
	};

	useEffect(() => {
		if (StoreID.id === 0) {
			setPage(<Jikan />);
		} else {
			UpdateNames();
		}
	}, [StoreID]);

	return (
		<div className="page" style={{ overflowY: 'scroll' }}>
			<Breadcrumb>
				<Breadcrumb.Item href="#">Anime</Breadcrumb.Item>
				<Breadcrumb.Item
					onClick={() => {
						Reset();
					}}
				>
					Top Anime
				</Breadcrumb.Item>
				{StoreID.id != 0 ? (
					<Breadcrumb.Item active as={'p'} style={AnimeNameStyle}>
						{AnimeName}
					</Breadcrumb.Item>
				) : (
					''
				)}
			</Breadcrumb>
			{Page}
		</div>
	);
}

export default Anime;
