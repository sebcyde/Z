import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';

type Props = {};

const CreateListComponent = (props: Props) => {
	const navigate = useNavigate();

	return (
		<div
			className="CreateListComponentContainer"
			onClick={() => navigate('/createlist')}
		>
			<div className="ImageContainer">
				<AddCircleIcon />
			</div>
			<div className="TextContainer">
				<p>Create new list</p>
			</div>
		</div>
	);
};

export default CreateListComponent;
