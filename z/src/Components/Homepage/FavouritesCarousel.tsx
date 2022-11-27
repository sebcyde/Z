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
			const docRef = doc(db, `Users/${user.uid}/MoreInfo/Lists`);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				console.log('Carousel Data:', data);
				let Favourites;
				data.Favourites.length === 0
					? (Favourites = data[Object.keys(data)[1]])
					: (Favourites = data.Favourites);

				console.log('Carousel List:', Favourites);
				return Favourites;
			} else {
				console.log('No such document!');
			}
		}
	};

	useEffect(() => {
		PullFavourites().then((Favourites) => {
			if (Favourites == undefined) {
				setNewCarousel('');
			} else {
				setNewCarousel(
					<>
						<div className="FavouritesContainer">
							<h2 className="">From Your Lists</h2>
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
						</div>
					</>
				);
			}
			setLoading(false);
		});
	}, []);

	return <>{Loading ? <LoadingScreen /> : <>{NewCarousel}</>}</>;
}

export default FavouritesCarousel;
