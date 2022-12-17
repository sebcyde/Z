import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { FaHome, FaRegBookmark, FaRegUser, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type Props = {};

function BottomNavbar({}: Props) {
	const navigate = useNavigate();

	const NavHome = () => navigate('/');
	const NavSearch = () => navigate('/search');
	const NavUser = () => navigate('/friends');
	const NavLists = () => navigate('/mylists');

	return (
		<div className="BottomNav">
			<div onClick={NavHome}>
				<FaHome />
			</div>
			<div onClick={NavSearch}>
				<FaSearch />
			</div>
			<div onClick={NavLists}>
				<FaRegBookmark />
			</div>
			<div onClick={NavUser}>
				<FaRegUser />
			</div>
		</div>
	);
}

export default BottomNavbar;
