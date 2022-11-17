import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Jikan from '../../Components/Jikan';
import AnimeDetails from './AnimeDetails';
import LoadingScreen from '../LoadingScreen';
import { useNavigate } from 'react-router-dom';
import { Update } from '../../Store/Slices/AnimeSlice';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import axios from 'axios';
import '../../Styles/AnimeStyles.scss';
import Container from 'react-bootstrap/Container';

type Props = {};

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
			setPage(
				<Container>
					<Jikan />
				</Container>
			);
		} else {
			UpdateNames();
		}
	}, [StoreID]);

	return (
		<div className="page" style={{ overflowY: 'scroll' }}>
			<Breadcrumb className="BC">
				<Breadcrumb.Item as={'li'} className="BreadCrumbItemsStyle">
					Anime
				</Breadcrumb.Item>
				<Breadcrumb.Item
					as={'li'}
					className="BreadCrumbItemsStyle"
					onClick={() => {
						Reset();
					}}
				>
					Top Anime
				</Breadcrumb.Item>
				{StoreID.id != 0 ? (
					<Breadcrumb.Item
						active
						as={'p'}
						className="BreadCrumbItemsStyle Active"
					>
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
