import React, { useState } from 'react';
import Logo from '../../assets/ZLogo.png';
import { Button, Container, Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateMangaID } from '../../Store/Slices/MangaSlice';
import { Update } from '../../Store/Slices/AnimeSlice';

type Props = {};

const NavLinkStyle = {
	paddingLeft: '10px',
};

function MainNavbar({}: Props) {
	const StoreID = useSelector((state: any) => state.IDState);
	const StoreMangaID = useSelector((state: any) => state.MangaIDState);
	const [User, setUser] = useState<string>('Sebastian');
	const dispatch = useDispatch();

	const PullID = () => {
		console.log('Anime StoreID:', StoreID);
		console.log('Manga StoreMangaID:', StoreMangaID);
	};

	const ResetAll = () => {
		dispatch(UpdateMangaID(0));
		dispatch(Update(0));
	};

	return (
		<Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="#home">
					<img
						alt=""
						src={Logo}
						width="40"
						height="40"
						className="d-inline-block align-top"
					/>
				</Navbar.Brand>
				<Navbar.Toggle
					aria-controls="responsive-navbar-nav"
					style={{ border: 'none', color: '#edf2f4' }}
				/>
			</Container>
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="me-auto">
					<Nav.Link
						eventKey="1"
						as={Link}
						to="/"
						style={NavLinkStyle}
						onClick={ResetAll}
					>
						Homepage
					</Nav.Link>

					<Nav.Link
						eventKey="2"
						as={Link}
						to="anime"
						style={NavLinkStyle}
						onClick={ResetAll}
					>
						Anime
					</Nav.Link>
					<Nav.Link
						eventKey="3"
						as={Link}
						to="manga"
						style={NavLinkStyle}
						onClick={ResetAll}
					>
						Manga
					</Nav.Link>
					<Nav.Link
						eventKey="4"
						as={Link}
						to="mylists"
						style={NavLinkStyle}
						onClick={ResetAll}
					>
						My Lists
					</Nav.Link>
					<Nav.Link
						eventKey="5"
						as={Link}
						to="settings"
						style={NavLinkStyle}
						onClick={ResetAll}
					>
						Settings
					</Nav.Link>
					{/* <Navbar.Text style={NavLinkStyle}>
						Signed in as: <a href="#login">{User}</a>
					</Navbar.Text> */}
				</Nav>
				<Button onClick={PullID}>Pull Store ID</Button>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default MainNavbar;
