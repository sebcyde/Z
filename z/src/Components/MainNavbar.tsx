import React, { useState } from 'react';
import Logo from '../assets/ZLogo.png';
import { Container, Navbar } from 'react-bootstrap';

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
					style={{ border: '1px solid #edf2f4', color: '#edf2f4' }}
				/>
			</Container>
			<Navbar.Collapse className="justify-content-end">
				<Navbar.Text>
					Signed in as: <a href="#login">{User}</a>
				</Navbar.Text>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default MainNavbar;
