import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TopManga from '../../Components/Manga/TopManga';
import { UpdateMangaID } from '../../Store/Slices/MangaSlice';
import '../../Styles/MangaStyles.scss';
import MangaDetails from './MangaDetails';

type Props = {};

function Manga({}: Props) {
	const StoreMangaID = useSelector((state: any) => state.MangaIDState);
	const [MangaName, setMangaName] = useState<string>('');
	const [Page, setPage] = useState(<TopManga />);
	const dispatch = useDispatch();

	const UpdateNames = async () => {
		const GetName = await axios.get(
			`https://api.jikan.moe/v4/manga/${StoreMangaID.id}/full`
		);
		setMangaName(GetName.data.data.title);
		setPage(<MangaDetails />);
	};

	const Reset = async () => {
		dispatch(UpdateMangaID(0));
		setPage(<TopManga />);
	};

	useEffect(() => {
		if (StoreMangaID.id === 0) {
			setPage(
				<Container>
					<TopManga />
				</Container>
			);
		} else {
			UpdateNames();
		}
	}, [StoreMangaID]);

	return (
		<div>
			<Breadcrumb className="BC">
				<Breadcrumb.Item as={'li'} className="BreadCrumbItemsStyle">
					Manga
				</Breadcrumb.Item>
				<Breadcrumb.Item
					as={'li'}
					className="BreadCrumbItemsStyle"
					onClick={() => {
						Reset();
					}}
				>
					Top Manga
				</Breadcrumb.Item>
				{StoreMangaID.id != 0 ? (
					<Breadcrumb.Item
						active
						as={'p'}
						className="BreadCrumbItemsStyle Active"
					>
						{MangaName}
					</Breadcrumb.Item>
				) : (
					''
				)}
			</Breadcrumb>
			{Page}
		</div>
	);
}

export default Manga;
