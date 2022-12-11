import { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Anime from './Pages/Anime/Anime';
import Homepage from './Pages/Homepage/Homepage';
import LoadingScreen from './Pages/LoadingScreen';
import Manga from './Pages/Manga/Manga';
import MyLists from './Pages/MyLists/MyLists';
import Settings from './Pages/Settings/Settings';
import MainNavbar from './Components/Navbar/MainNavbar';
import AnimeDetails from './Pages/Anime/AnimeDetails';
import Search from './Pages/Search/Search';
import SignIn from './Pages/SignIn/SignInComponent';
import SignUp from './Pages/SignUp/SignUpComponent';
import './Styles/Modal.scss';
import People from './Pages/People/People';
import UserName from './Pages/Settings/Edit/UserName';
import UserEmail from './Pages/Settings/Edit/UserEmail';
import UserImage from './Pages/Settings/Edit/UserImage';

function App() {
	const [Loading, setLoading] = useState<boolean>(true);
	const [MainNav, setMainNav] = useState<any>(undefined);
	const navigate = useNavigate();
	const auth = getAuth();

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, []);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				console.log('From App. No User Present');
				navigate('/signin');
				setMainNav(undefined);
			} else {
				navigate('/');
				setMainNav(<MainNavbar />);
			}
		});
	}, []);

	return (
		<div className="App">
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					{MainNav}
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="anime" element={<Anime />} />
						<Route path="animedetails" element={<AnimeDetails />} />
						<Route path="search" element={<Search />} />
						<Route path="manga" element={<Manga />} />
						<Route path="mylists" element={<MyLists />} />
						<Route path="settings" element={<Settings />} />
						<Route path="signin" element={<SignIn />} />
						<Route path="signup" element={<SignUp />} />
						<Route path="edit">
							<Route path="userimage" element={<UserImage />} />
							<Route path="username" element={<UserName />} />
							<Route path="useremail" element={<UserEmail />} />
						</Route>
						<Route path="people" element={<People />} />
					</Routes>
				</>
			)}
		</div>
	);
}

export default App;
