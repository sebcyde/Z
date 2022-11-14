import React, { useState } from 'react';
import Logo from '../../assets/ZLogo.png';
import { Container, Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type Props = {};

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
					<Nav.Link eventKey="1" as={Link} to="/">
						Homepage
					</Nav.Link>

					<Nav.Link eventKey="2" as={Link} to="anime">
						Anime
					</Nav.Link>
					<Nav.Link eventKey="3" as={Link} to="manga">
						Manga
					</Nav.Link>
					<Nav.Link eventKey="4" as={Link} to="mylists">
						MyLists
					</Nav.Link>
					<Nav.Link eventKey="5" as={Link} to="settings">
						Settings
					</Nav.Link>
					<Navbar.Text>
						Signed in as: <a href="#login">{User}</a>
					</Navbar.Text>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default MainNavbar;
