import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Update } from '../../Store/Slices/AnimeSlice';

type Props = {
	URL: string;
};

function TopPoster({ URL }: Props) {
	const [Loading, setLoading] = useState<boolean>(true);
	const [AnimePoster, setAnimePoster] = useState<any>();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const NavigateAnimePage = async (ID: number) => {
		dispatch(Update(ID));
		navigate('animedetails');
	};

	useEffect(() => {
		axios
			.get(URL)
			.then((response) => {
				const Ani = response.data.data[0];
				console.log('Poster Anime:', Ani);
				return (
					<div
						className="PosterContainer"
						style={{
							height: '500px',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<img
							src={Ani.images.jpg.large_image_url}
							alt="Poster image"
							className="PosterImage"
							style={{ height: '500px', opacity: '.6' }}
						/>
						<div
							className="PosterDetails"
							style={{ width: '95%', bottom: '30px', position: 'absolute' }}
						>
							<h2 className="PosterTitle">{Ani.title}</h2>
							<p className="PosterSynopsis">{Ani.synopsis}</p>
							<Button
								className="PosterButton"
								onClick={() => {
									NavigateAnimePage(Ani.mal_id);
								}}
							>
								Read More
							</Button>
						</div>
					</div>
				);
			})
			.then((NewAnime) => setAnimePoster(NewAnime))
			.then(() => {
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);
	return <>{Loading ? '' : AnimePoster}</>;
}

export default TopPoster;
