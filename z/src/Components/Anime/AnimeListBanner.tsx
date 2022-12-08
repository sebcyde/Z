import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import LoadingScreen from '../../Pages/LoadingScreen';
import { Update } from '../../Store/Slices/AnimeSlice';
import AOS from 'aos';
import 'aos/dist/aos.css';

type Props = {
	URL: string;
	Title: string;
};

function AnimeListBanner({ URL, Title }: Props) {
	const [Loading, setLoading] = useState<boolean>(true);
	const [AnimeList, setAnimeList] = useState<JSX.Element[][]>();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		AOS.init();
	}, []);

	const NavigateAnimePage = async (ID: number) => {
		dispatch(Update(ID));
		navigate('/animedetails');
	};

	useEffect(() => {
		console.log('Pulling:', URL);
		if (URL !== '') {
			axios
				.get(URL)
				.then((response) => {
					console.log('Title:', Title);
					console.log('Response:', response);
					const NewAnime = response.data.data.map((Ani: any, index: number) => {
						return (
							<div
								key={index}
								className="AnimeContainer"
								onClick={() => {
									NavigateAnimePage(Ani.mal_id);
								}}
							>
								<img src={Ani.images.jpg.image_url} />
								<div className="AnimeDetailsContainer">
									<h3 className="AnimeTitle">{Ani.title}</h3>
									<h3 className="AnimeEpisodes">Episodes: {Ani.episodes}</h3>
								</div>
							</div>
						);
					});

					return NewAnime;
				})
				.then((NewAnime) => setAnimeList(NewAnime))
				.then(() => {
					setLoading(false);
				})
				.catch((err) => console.log(err));
		}
	}, [URL]);

	return (
		<div className="AnimeListBanner">
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<h2 className="Banner">{Title}</h2>
					<div className="BannerContainer">{AnimeList}</div>
				</>
			)}
		</div>
	);
}

export default AnimeListBanner;
