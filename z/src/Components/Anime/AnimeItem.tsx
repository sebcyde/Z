import { Chip } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Update } from '../../Store/Slices/AnimeSlice';
import { Anime } from '../../Types/AnimeTypes';

type Props = {
	Anime: Anime;
};

const AnimeItem = ({ Anime }: Props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const NavAnime = () => {
		dispatch(Update(Anime.mal_id));
		navigate('/animedetails');
	};

	return (
		<div className="AnimeDetailsContainer" onClick={NavAnime}>
			<div className="AnimeImageContaienr">
				<img src={Anime.images.jpg.image_url} className="AnimeImage" />
			</div>
			<div className="AnimeDetails">
				<h2 className="AnimeTitle">{Anime.title}</h2>

				<span className="AnimeRanking">
					{Anime.rank ? <p>Rank: {Anime.rank}</p> : ''}
					{Anime.score ? <p>Score: {Anime.score}</p> : ''}
				</span>
				<span className="AnimeGenres">
					{Anime.genres[0] ? (
						<Chip label={Anime.genres[0].name} className="GenreChip" />
					) : (
						''
					)}
					{Anime.genres[1] ? (
						<Chip label={Anime.genres[1].name} className="GenreChip" />
					) : (
						''
					)}
				</span>
			</div>
		</div>
	);
};

export default AnimeItem;
