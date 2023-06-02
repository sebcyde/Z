import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import LoadingScreen from '../../Pages/LoadingScreen';
import { UpdateMangaID } from '../../Store/Slices/MangaSlice';

type Props = {};

function TopManga({}: Props) {
	const [MangaMap, setMangaMap] = useState<any[]>([]);
	const [Loading, setLoading] = useState<boolean>(true);
	const dispatch = useDispatch();

	const NavigateMangaPage = (ID: number) => {
		dispatch(UpdateMangaID(ID));
	};

	const Pull = async (Endpoint: string) => {
		const Response = await axios.get(Endpoint);
		const Data = await [Response.data.data, Response.data.pagination];
		console.log(Data);
		const BaseManga = await Promise.all(
			Data[0].map((Manga: any, index: number) => {
				return (
					<Col
						className="MangaCard"
						key={index}
						onClick={() => {
							NavigateMangaPage(Manga.mal_id);
						}}
					>
						<img src={Manga.images.jpg.image_url} />
						<div>
							<h2>{Manga.title}</h2>

							<span>
								<p>Rank: {Manga.rank}</p>
								<p>Score: {Manga.score} / 10</p>
							</span>
							<p className="Mangasynopsis">{Manga.synopsis}</p>
						</div>
					</Col>
				);
			})
		);

		setMangaMap(BaseManga);
		setLoading(false);
	};

	useEffect(() => {
		Pull('https://api.jikan.moe/v4/top/manga');
	}, []);

	return (
		<div>
			{Loading ? (
				<LoadingScreen />
			) : (
				<div>
					{MangaMap}
					<div
						style={{
							width: 'fit-content',
							margin: 'auto',
						}}
					></div>
				</div>
			)}
		</div>
	);
}

export default TopManga;
