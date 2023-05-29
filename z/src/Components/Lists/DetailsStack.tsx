import { DateFormatter } from '../../Functions/Helpers/DateFormatter';
import { ListStackImage } from './ListStackImage';

type Props = {
	List: any;
	ListName: string;
	Creator: string;
	CreatorImage: string;
};

const DetailsStack = ({ List, ListName, Creator, CreatorImage }: Props) => {
	const Image = List.Anime[0].images.jpg.large_image_url;
	return (
		<div className="DetailsStackContainer">
			<div>
				<div className="StackTopContainer">
					<ListStackImage Layer="Top" ImageSource={Image} />
				</div>
				<div className="StackMiddleContainer">
					<ListStackImage Layer="Middle" ImageSource={Image} />
				</div>
				<div className="StackBottomContainer">
					<ListStackImage Layer="Bottom" ImageSource={Image} />
				</div>
			</div>
			<div>
				<p className="StackName">{ListName}</p>
				<p className="StackLength">Items: {List.Anime.length}</p>
				<p className="StackLastUpdated">
					Last Updated: {DateFormatter(List.Updated)}
				</p>
				{/* <span className="ImageNameContainer">
					<div className="ImageContainer">
						<img src={CreatorImage} />
					</div>

					<span className="StackCreator">
						<p>Made by</p>
						<p>{Creator}</p>
					</span>
				</span> */}
			</div>
		</div>
	);
};

export default DetailsStack;
