import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import LoadingScreen from '../../Pages/LoadingScreen';

type Props = {};

function ForYouCarousel({}: Props) {
	const [Loading, setLoading] = useState<boolean>(true);
	const [NewCarousel, setNewCarousel] = useState<any>();
	useEffect(() => {
		axios.get('https://api.jikan.moe/v4/top/anime').then((response) => {
			const Data = response.data.data;
			console.log(Data);
			setNewCarousel(
				<Carousel>
					<Carousel.Item interval={3000}>
						<h4 style={{ textAlign: 'center' }}>lorem lorem lorem lorem</h4>
						<Carousel.Caption>
							<h3>{Data[0].title}</h3>
							{/* <p>{Data[0].synopsis}</p> */}
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item interval={3000}>
						<img
							className="d-block w-100 carouselimage"
							src={Data[1].images.jpg.image_url}
							alt="Second slide"
						/>
						<Carousel.Caption>
							<h3>{Data[1].title}</h3>
							{/* <p>{Data[1].synopsis}</p> */}
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item interval={3000}>
						<img
							className="d-block w-100 carouselimage"
							src={Data[2].images.jpg.image_url}
							alt="Third slide"
						/>
						<Carousel.Caption>
							<h3>{Data[2].title}</h3>
							{/* <p>{Data[2].synopsis}</p> */}
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
			);
			setLoading(false);
		});
	}, []);

	return <div>{Loading ? <LoadingScreen /> : <>{NewCarousel}</>}</div>;
}

export default ForYouCarousel;
