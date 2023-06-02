import { Anime } from '../../Types/AnimeTypes';

type props = {
	Anime: Anime;
};

export const ListItem = async ({ Anime }: props) => {
	console.log('Anime From List Item:', Anime);

	return (
		<div className="ListItemContainer">
			<div className="ImageContainer">
				<img />
			</div>
			<div className="DetailsContainer">
				<h3 className="AnimeTitle">Example Title</h3>
				<p className="AnimeAiring"></p>
				<p className="AnimeSynopsis"></p>
			</div>
		</div>
	);
};
