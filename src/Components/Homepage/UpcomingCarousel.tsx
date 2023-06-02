import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import LoadingScreen from '../../Pages/LoadingScreen';
import Banner1 from '../../assets/ads/Pespi1.webp';
import Banner2 from '../../assets/ads/JumpFest.webp';
import Banner3 from '../../assets/ads/Pocari.jpg';

type Props = {};

function UpcomingCarousel({}: Props) {
	const [NewCarousel, setNewCarousel] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);
	// useEffect(() => {
	// 	axios.get('https://api.jikan.moe/v4/seasons/upcoming').then((response) => {
	// 		const Data = response.data.data;
	// 		setNewCarousel(
	// 			<Carousel>
	// 				<Carousel.Item interval={3000}>
	// 					<img
	// 						className="d-block w-100"
	// 						src={Data[0].images.webp.image_url}
	// 						alt="First slide"
	// 					/>
	// 					<Carousel.Caption>
	// 						<h3>{Data[0].title}</h3>
	// 						{/* <p>{Data[0].synopsis}</p> */}
	// 					</Carousel.Caption>
	// 				</Carousel.Item>
	// 				<Carousel.Item interval={3000}>
	// 					<img
	// 						className="d-block w-100"
	// 						src={Data[1].images.jpg.image_url}
	// 						alt="Second slide"
	// 					/>
	// 					<Carousel.Caption>
	// 						<h3>{Data[1].title}</h3>
	// 						{/* <p>{Data[1].synopsis}</p> */}
	// 					</Carousel.Caption>
	// 				</Carousel.Item>
	// 				<Carousel.Item interval={3000}>
	// 					<img
	// 						className="d-block w-100"
	// 						src={Data[2].images.jpg.image_url}
	// 						alt="Third slide"
	// 					/>
	// 					<Carousel.Caption>
	// 						<h3>{Data[2].title}</h3>
	// 						{/* <p>{Data[2].synopsis}</p> */}
	// 					</Carousel.Caption>
	// 				</Carousel.Item>
	// 			</Carousel>
	// 		);
	// 		setLoading(false);
	// 	});
	// }, []);

	return (
		<div>
			{/* {Loading ? (
				<LoadingScreen />
			) : (
				<>
					<h2 style={{ margin: '10px' }}>Upcoming</h2>
					{NewCarousel}
				</>
			)} */}

			<Carousel indicators={false}>
				<Carousel.Item interval={3000}>
					<img
						className="d-block w-100 adcarouselimage"
						src={Banner1}
						alt="First slide"
					/>
				</Carousel.Item>
				<Carousel.Item interval={3000}>
					<img
						className="d-block w-100 adcarouselimage"
						src={Banner2}
						alt="Second slide"
					/>
				</Carousel.Item>
				<Carousel.Item interval={3000}>
					<img
						className="d-block w-100 adcarouselimage"
						src={Banner3}
						alt="Third slide"
					/>
				</Carousel.Item>
			</Carousel>
		</div>
	);
}

export default UpcomingCarousel;
