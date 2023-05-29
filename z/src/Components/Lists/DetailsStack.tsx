type Props = {
	List: any;
	ListName: string;
	Creator: string;
	CreatorImage: string;
};

const DetailsStack = ({ List, ListName, Creator, CreatorImage }: Props) => {
	return (
		<div className="DetailsStackContainer">
			<div>
				<div className="StackTopContainer">
					<img
						className="StackTop"
						src={List[ListName].Anime[0].images.jpg.large_image_url}
					/>
				</div>
				<div className="StackMiddleContainer">
					<img
						className="StackMiddle"
						src={List[ListName].Anime[0].images.jpg.large_image_url}
					/>
				</div>
				<div className="StackBottomContainer">
					<img
						className="StackBottom"
						src={List[ListName].Anime[0].images.jpg.large_image_url}
					/>
				</div>
			</div>
			<div>
				<p className="StackName">{ListName}</p>
				<p className="StackLength">Items: {List[ListName].Anime.length}</p>
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

export default DetailsStack;
