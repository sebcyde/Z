import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../Pages/LoadingScreen';
import { Update } from '../../Store/Slices/AnimeSlice';
import '../../Styles/MangaStyles.scss';

type Props = {};

function FavouritesCarousel({}: Props) {
	const [Loading, setLoading] = useState<boolean>(true);
	const [NewCarousel, setNewCarousel] = useState<any>();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const Favourites = useSelector(
		(state: any) => state.FavouritesListState.Favourites
	);

	const NavigateAnimePage = async (ID: number) => {
		dispatch(Update(ID));
		navigate('/animedetails');
	};

	useEffect(() => {
		setNewCarousel(
			<Carousel indicators={false}>
				{Favourites.map((Anime: any, index: number) => {
					return (
						<Carousel.Item interval={3000} key={index}>
							<img
								className="d-block w-100 FavouritesImage"
								src={Anime.images.jpg.image_url}
								alt="Anime image"
							/>
							<div className="FavouritesDetails">
								<h2 className="FavouritesTitle">{Anime.title}</h2>
							</div>
							<Button
								className="PosterButton"
								onClick={() => {
									NavigateAnimePage(Anime.mal_id);
								}}
							>
								Read More
							</Button>
						</Carousel.Item>
					);
				})}
			</Carousel>
		);
		setLoading(false);
		// });
	}, [Favourites]);

	return (
		<>
			{Loading ? (
				<LoadingScreen />
			) : Favourites.length > 0 ? (
				<div className="FavouritesContainer">
					<h2 className="Banner">For You</h2>
					{NewCarousel}
				</div>
			) : (
				''
			)}
		</>
	);
}

export default FavouritesCarousel;
