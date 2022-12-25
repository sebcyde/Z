import React, { useEffect, useState } from 'react';
import Logo from '../../assets/ZLogo.png';
import { Button, Container, Nav, Navbar, NavItem } from 'react-bootstrap';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateMangaID } from '../../Store/Slices/MangaSlice';
import { Update } from '../../Store/Slices/AnimeSlice';
import { getAuth } from 'firebase/auth';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import PeopleIcon from '@mui/icons-material/People';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Divider } from '@mui/material';
import { UpdateAdminData } from '../../Store/Slices/AdminSlice';
type Props = {};

const NavLinkStyle = {
	padding: '5px 20px',
};

function MainNavbar({}: Props) {
	const UserID = useSelector((state: any) => state.UserState);
	const StoreID = useSelector((state: any) => state.IDState);
	const StoreMangaID = useSelector((state: any) => state.MangaIDState);
	const FaveList = useSelector(
		(state: any) => state.FavouritesListState.Favourites
	);
	const dispatch = useDispatch();
	const [Admin, setAdmin] = useState<boolean | undefined>(false);
	const auth = getAuth();
	const user = auth.currentUser;
	const navigate = useNavigate();
	let AdminData = {};

	const getAdminStatus = async () => {
		const UserRef = doc(db, `Users/${user?.uid}`);
		const UserSnap = await getDoc(UserRef);
		if (UserSnap.exists()) {
			setAdmin(UserSnap.data().Admin);
			AdminData = { ...UserSnap.data() };
		}
	};

	const PullData = async () => {
		if (user) {
			console.log('Anime StoreID:', StoreID);
			console.log('Manga StoreMangaID:', StoreMangaID);
			console.log('Current User:', user);
			const docRef = doc(db, `Users/${user.uid}/MoreInfo/Lists`);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const Lists = docSnap.data();
				console.log('Current User DB Lists:', Lists);
				AdminData = { ...AdminData, ...Lists };
			} else {
				console.log('No Lists Available!');
			}

			console.log('Current User is Admin?', Admin);
			console.log(UserID);
			if (user.uid != '') {
				const QuerydocRef = doc(db, `Users/${user.uid}`);
				const QuerydocSnap = await getDoc(QuerydocRef);
				if (QuerydocSnap.exists()) {
					const Querydocs = QuerydocSnap.data();
					console.log('User Search Query:', Querydocs);
					AdminData = { ...AdminData, Querydocs };
				} else {
					console.log('User Search Query - No Info Available!');
				}
				// const QueryListsRef = doc(db, `Users/${UserID.UserID}/MoreInfo/Lists`);
				// const QueryListsSnap = await getDoc(QueryListsRef);
				// if (QueryListsSnap.exists()) {
				// 	const QueryLists = QueryListsSnap.data();
				// 	console.log('User Search Query DB Lists:', QueryLists);
				// 	console.log(
				// 		'Search Query User is Admin?',
				// 		QuerydocSnap.data()?.Admin
				// 	);
				// 	AdminData = { ...AdminData, QueryLists };
				// 	AdminData = {
				// 		...AdminData,
				// 		'Search Query User is Admin?': QuerydocSnap.data()?.Admin,
				// 	};
				// } else {
				// 	console.log('User Search Query - No Lists Available!');
				// }
			}

			dispatch(UpdateAdminData(AdminData));
			navigate('/admin');
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
					{/* <Nav.Link
						eventKey="1"
						as={Link}
						to="/"
						style={NavLinkStyle}
						onClick={ResetAll}
					>
						Home
					</Nav.Link> */}

					<Nav.Link
						eventKey="2"
						as={Link}
						to="anime"
						style={NavLinkStyle}
						onClick={ResetAll}
					>
						<LiveTvIcon /> Anime
					</Nav.Link>
					<Divider variant="middle" light={true} />
					<Nav.Link
						eventKey="3"
						as={Link}
						to="manga"
						style={NavLinkStyle}
						onClick={ResetAll}
					>
						<AutoStoriesIcon />
						Manga
					</Nav.Link>
					<Divider variant="middle" light={true} />
					<Nav.Link
						eventKey="4"
						as={Link}
						to="people"
						style={NavLinkStyle}
						onClick={ResetAll}
					>
						<PeopleIcon />
						People
					</Nav.Link>
					<Divider variant="middle" light={true} />
					{/* <Nav.Link
						eventKey="5"
						as={Link}
						to="search"
						style={NavLinkStyle}
						onClick={ResetAll}
					>
						Search
					</Nav.Link> */}
					<Nav.Link
						eventKey="6"
						as={Link}
						to="mylists"
						style={NavLinkStyle}
						onClick={ResetAll}
					>
						<FormatListBulletedIcon /> My Lists
					</Nav.Link>

					{/* <Divider variant="middle" light={true} />
					<Nav.Link
						eventKey="7"
						as={Link}
						to="messages"
						style={NavLinkStyle}
						onClick={ResetAll}
					>
						<EmailIcon /> Messages
					</Nav.Link> */}

					{/* <Nav.Link
						eventKey="8"
						as={Link}
						to="settings"
						style={NavLinkStyle}
						onClick={ResetAll}
					>
						Settings
					</Nav.Link> */}
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
							<KeyboardDoubleArrowDownIcon />
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
