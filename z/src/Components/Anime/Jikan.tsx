import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Update } from '../../Store/Slices/AnimeSlice';
import Pagination from 'react-bootstrap/Pagination';
import LoadingScreen from '../../Pages/LoadingScreen';
import { Col } from 'react-bootstrap';

function Jikan() {
	const [AnimeMap, setAnimeMap] = useState<any[]>([]);
	const [PageNumber, setPageNumber] = useState<number>(1);
	const [Loading, setLoading] = useState<boolean>(true);
	const dispatch = useDispatch();
	const Endpoint =
		PageNumber === 1
			? 'https://api.jikan.moe/v4/top/anime'
			: `https://api.jikan.moe/v4/top/anime?page=${PageNum}`;

	const Pull = async (Endpoint: string) => {
		const Response = await axios.get(Endpoint);
		const Data = await [Response.data.data, Response.data.pagination];
		console.log(Data);
		const BaseAnime = await Promise.all(
			Data[0].map((Anime: any, index: number) => {
				return (
					<Col
						className="AnimeCard"
						key={index}
						onClick={() => {
							NavigateAnimePage(Anime.mal_id);
						}}
					>
						<img src={Anime.images.jpg.image_url} />
						<div>
							<h2>
								{Anime.title} - {Anime.year}
							</h2>

							<span>
								<p>Rank: {Anime.rank}</p>
								<p>Score: {Anime.score} / 10</p>
							</span>
							<p className="Animesynopsis">{Anime.synopsis}</p>
						</div>
					</Col>
				);
			})
		);

		setAnimeMap(BaseAnime);
		setLoading(false);
	};

	const NavigateAnimePage = async (ID: number) => {
		dispatch(Update(ID));
	};

	useEffect(() => {
		Pull(Endpoint);
	}, []);

	return (
		<>
			{Loading ? (
				<LoadingScreen />
			) : (
				<div>
					{AnimeMap}
					<div
						style={{
							width: 'fit-content',
							margin: 'auto',
						}}
					>
						{/* <Pagination>
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
						</Pagination> */}
					</div>
				</div>
			)}
		</>
	);
}

export default Jikan;
