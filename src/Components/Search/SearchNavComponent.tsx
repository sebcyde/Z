import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../Styles/AnimeStyles.scss';

type Props = {};

function SearchNavComponent() {
	const navigate = useNavigate();

	const Nav = () => navigate('/search');

	return (
		<div
			className="SearchNavComponent"
			style={{ textAlign: 'center', margin: '20px' }}
		>
			<h3>Can't find what you're looking for?</h3>
			<p>Search hundreds of anime and manga</p>
			<Button className="Button" onClick={() => Nav()}>
				Let's do it
			</Button>
		</div>
	);
}

export default SearchNavComponent;
