import { Anime } from '../../../Types/AnimeTypes';
import React from 'react';

type Props = {
	RelatedItem: {
		data: Anime;
		name: string;
	};
};

const RelatedTile = ({ RelatedItem }: Props) => {
	return (
		<div className="RelatedTileContainer">
			<div className="ImageContainer">
				<img src={RelatedItem.data.images.jpg.large_image_url} />
			</div>
			<div className="DetailsContainer">
				<h3 className="Title">{RelatedItem.data.title}</h3>
				<p className="Relation">{RelatedItem.name}</p>
				<p className="Synopsis">{RelatedItem.data.synopsis}</p>
			</div>
		</div>
	);
};

export default RelatedTile;
