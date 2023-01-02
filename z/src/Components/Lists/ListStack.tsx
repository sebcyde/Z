import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { useEffect } from 'react';

type Props = {
	List: any;
	ListName: string;
	Creator: string;
};

const ListStack = ({ List, ListName, Creator }: Props) => {
	const NavigateToList = () => {
		console.log('Navigating to:', ListName);
	};

	return (
		<div className="ListStackContainer" onClick={NavigateToList}>
			<div>
				<div className="StackTopContainer">
					<img
						className="StackTop"
						src={List[ListName][0].images.jpg.large_image_url}
					/>
				</div>
				<div className="StackMiddleContainer">
					<img
						className="StackMiddle"
						src={List[ListName][0].images.jpg.large_image_url}
					/>
				</div>
				<div className="StackBottomContainer">
					<img
						className="StackBottom"
						src={List[ListName][0].images.jpg.large_image_url}
					/>
				</div>
			</div>
			<div>
				<p className="StackName">{ListName}</p>
				<p className="StackCreator">{Creator}</p>
				<p className="StackLength">Items: {List[ListName].length}</p>
			</div>
		</div>
	);
};

export default ListStack;
