import { Anime } from '../../Types/AnimeTypes';

type Props = {
	Anime: Anime;
};

const SingleBanner = ({ Anime }: Props) => {
	return <div className="AnimeSingleBannerContainer">{Anime.title}</div>;
};

export default SingleBanner;
