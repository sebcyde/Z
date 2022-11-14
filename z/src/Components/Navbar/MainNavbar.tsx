import React, { useState } from 'react';
import Logo from '../../assets/ZLogo.png';
import { Container, Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type Props = {};

const NavLinkStyle = {
	paddingLeft: '10px',
};

function MainNavbar({}: Props) {
	const [User, setUser] = useState<string>('Sebastian');
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
					<Nav.Link eventKey="1" as={Link} to="/" style={NavLinkStyle}>
						Homepage
					</Nav.Link>

					<Nav.Link eventKey="2" as={Link} to="anime" style={NavLinkStyle}>
						Anime
					</Nav.Link>
					<Nav.Link eventKey="3" as={Link} to="manga" style={NavLinkStyle}>
						Manga
					</Nav.Link>
					<Nav.Link eventKey="4" as={Link} to="mylists" style={NavLinkStyle}>
						MyLists
					</Nav.Link>
					<Nav.Link eventKey="5" as={Link} to="settings" style={NavLinkStyle}>
						Settings
					</Nav.Link>
					<Navbar.Text style={NavLinkStyle}>
						Signed in as: <a href="#login">{User}</a>
					</Navbar.Text>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default MainNavbar;
