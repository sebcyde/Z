import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Jikan } from '../../API/Jikan';
import LoadingScreen from '../LoadingScreen';
import Pagination from 'react-bootstrap/Pagination';

type Props = {};

function Anime({}: Props) {
	const [AnimeData, setAnimeData] = useState<any[]>([]);
	const [Loading, setLoading] = useState<boolean>(true);
	const [PageNumber, setPageNumber] = useState<number>(1);
	const Pages: any[] = [];

	const PullData = async (PageNumber: number | undefined) => {
		let number = 1;
		let Response = await Jikan(PageNumber);
		for (let number = 1; number <= Response[1].last_visible_page; number++) {
			Pages.push(
				<Pagination.Item key={number} active={number === PageNumber}>
					{number}
				</Pagination.Item>
			);
		}
		console.log(Pages);
		setAnimeData(Response);
		setLoading(false);
	};

	useEffect(() => {
		PullData(undefined);
	}, []);

	useEffect(() => {
		PullData(PageNumber);
	}, [PageNumber]);

	return (
		<div className="page" style={{ overflowY: 'scroll' }}>
			{Loading ? <LoadingScreen /> : AnimeData[0]}
			<div
				style={{
					width: 'fit-content',
					margin: 'auto',
				}}
			>
				<Pagination>
					<Pagination.Prev
						onClick={() => {
							setPageNumber(PageNumber - 1);
						}}
					/>
					<Pagination.Item
						onClick={() => {
							setPageNumber(PageNumber - 2);
						}}
					>
						{PageNumber - 2}
					</Pagination.Item>
					<Pagination.Item
						onClick={() => {
							setPageNumber(PageNumber - 1);
						}}
					>
						{PageNumber - 1}
					</Pagination.Item>
					<Pagination.Item active>{PageNumber}</Pagination.Item>
					<Pagination.Item
						onClick={() => {
							setPageNumber(PageNumber + 1);
						}}
					>
						{PageNumber + 1}
					</Pagination.Item>
					<Pagination.Item
						onClick={() => {
							setPageNumber(PageNumber + 2);
						}}
					>
						{PageNumber + 2}
					</Pagination.Item>
					<Pagination.Next
						onClick={() => {
							setPageNumber(PageNumber + 1);
						}}
					/>
				</Pagination>
			</div>
		</div>
	);
}

export default Anime;
