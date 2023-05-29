import { ListStackImage } from './ListStackImage';

type Props = {
	ListName: string;
	Creator: string;
	CreatorImage: string;
};

const EmptyDetailsStack = ({ ListName, Creator, CreatorImage }: Props) => {
	return (
		<div className="DetailsStackContainer">
			<div>
				<div className="StackTopContainer">
					<ListStackImage Layer="Top" />
				</div>
				<div className="StackMiddleContainer">
					<ListStackImage Layer="Middle" />
				</div>
				<div className="StackBottomContainer">
					<ListStackImage Layer="Bottom" />
				</div>
			</div>
			<div>
				<p className="StackName">{ListName}</p>
				<p className="StackLength">Items: 0</p>
				<span className="ImageNameContainer">
					<div className="ImageContainer">
						<img src={CreatorImage} />
					</div>
					<span className="StackCreator">
						<p>Made by</p>
						<p>{Creator}</p>
					</span>
				</span>
			</div>
		</div>
	);
};

export default EmptyDetailsStack;
