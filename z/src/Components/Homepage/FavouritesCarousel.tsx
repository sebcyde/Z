import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../Pages/LoadingScreen';
import { Update } from '../../Store/Slices/AnimeSlice';
import '../../Styles/MangaStyles.scss';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase.js';
import { getAuth } from 'firebase/auth';

type Props = {};

function FavouritesCarousel({}: Props) {
	const [Loading, setLoading] = useState<boolean>(true);
	const [NewCarousel, setNewCarousel] = useState<any>();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const NavigateAnimePage = async (ID: number) => {
		dispatch(Update(ID));
		navigate('/animedetails');
	};

	const PullFavourites = async () => {
		const auth = getAuth();
		const user = auth.currentUser;
		if (user) {
			const docRef = doc(db, `Users/${user.uid}`);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				const Favourites = data.UserLists.Favourites;
				console.log('Favourites:', Favourites);
				return Favourites;
			} else {
				console.log('No such document!');
			}
		}
	};

	useEffect(() => {
		PullFavourites().then((Favourites) => {
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
								<span>
									<Button
										className="FavouritesButton"
										onClick={() => {
											NavigateAnimePage(Anime.mal_id);
										}}
									>
										Read More
									</Button>
									<p className="FavouritesType">{Anime.type}</p>
								</span>
							</Carousel.Item>
						);
					})}
				</Carousel>
			);
			setLoading(false);
		});
	}, []);

	return (
		<>
			{Loading ? (
				<LoadingScreen />
			) : (
				<div className="FavouritesContainer">
					<h2 className="Banner">For You</h2>
					{NewCarousel}
				</div>
			)}
		</>
	);
}

export default FavouritesCarousel;
