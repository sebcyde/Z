import React from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

type Props = {};

const BreadCrumbNavbar = (props: Props) => {
	const navigate = useNavigate();
	const Return = () => navigate(-1);

	return (
		<div className="BreadCrumbContainer">
			<span onClick={Return}>
				<ArrowBackIosNewIcon />
				<p>Back</p>
			</span>
		</div>
	);
};

export default BreadCrumbNavbar;
