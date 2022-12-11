import React, { useEffect, useState } from 'react';
import Logo from '../../assets/ZLogo.png';
import { Button, Container, Nav, Navbar, NavItem } from 'react-bootstrap';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateMangaID } from '../../Store/Slices/MangaSlice';
import { Update } from '../../Store/Slices/AnimeSlice';
import { getAuth } from 'firebase/auth';
type Props = {};

const NavLinkStyle = {
	paddingLeft: '10px',
};

function MainNavbar({}: Props) {
	const StoreID = useSelector((state: any) => state.IDState);
	const StoreMangaID = useSelector((state: any) => state.MangaIDState);
	const FaveList = useSelector(
		(state: any) => state.FavouritesListState.Favourites
	);
	const dispatch = useDispatch();
	const [Admin, setAdmin] = useState<boolean | undefined>(false);
	const auth = getAuth();
	const user = auth.currentUser;

	const getAdminStatus = async () => {
		const UserRef = doc(db, `Users/${user?.uid}`);
		const UserSnap = await getDoc(UserRef);
		if (UserSnap.exists()) {
			setAdmin(UserSnap.data().Admin);
		}
	};

	const PullData = async () => {
		if (user) {
			console.log('Current User:', user);

			const docRef = doc(db, `Users/${user.uid}/MoreInfo/Lists`);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const Lists = docSnap.data();
				console.log('DB Lists:', Lists);
			} else {
				console.log('No Lists Available!');
			}
			console.log('Anime StoreID:', StoreID);
			console.log('Manga StoreMangaID:', StoreMangaID);
			console.log('Current User is Admin?', Admin);
		}
	};

	const ResetAll = () => {
		dispatch(UpdateMangaID(0));
		dispatch(Update(0));
	};

	useEffect(() => {
		getAdminStatus();
	}, []);

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
						to="search"
						style={NavLinkStyle}
						onClick={ResetAll}
					>
						Search
					</Nav.Link>
					<Nav.Link
						eventKey="3"
						as={Link}
						to="anime"
						style={NavLinkStyle}
						onClick={ResetAll}
					>
						Anime
					</Nav.Link>
					<Nav.Link
						eventKey="4"
						as={Link}
						to="manga"
						style={NavLinkStyle}
						onClick={ResetAll}
					>
						Manga
					</Nav.Link>
					<Nav.Link
						eventKey="5"
						as={Link}
						to="people"
						style={NavLinkStyle}
						onClick={ResetAll}
					>
						People
					</Nav.Link>
					<Nav.Link
						eventKey="6"
						as={Link}
						to="mylists"
						style={NavLinkStyle}
						onClick={ResetAll}
					>
						My Lists
					</Nav.Link>
					<Nav.Link
						eventKey="7"
						as={Link}
						to="settings"
						style={NavLinkStyle}
						onClick={ResetAll}
					>
						Settings
						<span
							style={{
								color: 'red',
								margin: '0px',
								width: 'fit-content',
								marginLeft: '10px',
							}}
						>
							Updated!
						</span>
					</Nav.Link>
				</Nav>
				{user && Admin ? (
					<div
						style={{
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<Button
							onClick={PullData}
							style={{ margin: '10px auto', width: '90%' }}
						>
							Pull Data
						</Button>
					</div>
				) : (
					''
				)}
			</Navbar.Collapse>
		</Navbar>
	);
}

export default MainNavbar;
