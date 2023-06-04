import { useEffect, useState } from 'react';
import { Anime } from '../../../Types/AnimeTypes';
import { makeSequentialNamedAPICalls } from '../../../Functions/Helpers/MakeMultipleAPICalls';
import LoadingScreen from '../../../Pages/LoadingScreen';
import RelatedTile from './RelatedTile';

type Props = {
	Related: [
		{
			entry: [
				{
					mal_id: number;
					type: string;
					name: string;
					url: string;
				}
			];
			relation: string;
		}
	];
};

type RelatedItemsArray = Array<{
	url: string;
	name: string;
}>;

type ApiResponseArray = Array<{
	data: Anime;
	name: string;
}>;

const RelatedBanner = ({ Related }: Props) => {
	const [Items, setItems] = useState<ApiResponseArray>();
	const [Loading, setLoading] = useState(true);

	const PullData = async () => {
		const RelatedItems: RelatedItemsArray = Related.flatMap((RelatedItem) =>
			RelatedItem.entry.map((Item) => ({
				url: `https://api.jikan.moe/v4/anime/${Item.mal_id}/full`,
				name: RelatedItem.relation,
			}))
		);

		const AllData = await makeSequentialNamedAPICalls(RelatedItems);
		setItems(AllData);
	};

	useEffect(() => {
		PullData().then(() => setLoading(false));
	}, []);

	return (
		<div className="RelatedAnimeBannerContainer">
			{Loading ? (
				<LoadingScreen
					ExtraClass="RelatedBannerLoading"
					LoadingText="Loading Related Titles"
				/>
			) : Items && Items.length == 0 ? (
				''
			) : (
				<>
					<h3 className="BannerTitle">Related Titles:</h3>
					<div className="RelatedAnimeContainer">
						{Items!.map((RelatedItem) => (
							<RelatedTile RelatedItem={RelatedItem} />
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default RelatedBanner;
