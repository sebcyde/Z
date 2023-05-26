import { Update } from '../../Store/Slices/AnimeSlice';
import { Button, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Anime } from '../../Types/AnimeTypes';
import { useDispatch } from 'react-redux';

type props = {
	ListName: string;
	List: Anime[];
};

export const ListCarousel = ({ ListName, List }: props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const NavigateAnimePage = async (ID: number) => {
		dispatch(Update(ID));
		navigate('/animedetails');
	};

	return (
		<div className="FavouritesContainer">
			<h2 className="">From {ListName}</h2>
			<Carousel indicators={false}>
				{List.map((Anime: any, index: number) => {
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
	);
};
