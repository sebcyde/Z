import { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Anime from './Pages/Anime/Anime';
import Homepage from './Pages/Homepage/Homepage';
import LoadingScreen from './Pages/LoadingScreen';
import Manga from './Pages/Manga/Manga';
import MyLists from './Pages/Favourites';
import Settings from './Pages/Settings';
import MainNavbar from './Components/Navbar/MainNavbar';
import AnimeDetails from './Pages/Anime/AnimeDetails';
import Search from './Pages/Search/Search';
import SignIn from './Pages/SignIn/SignInComponent';
import SignUp from './Pages/SignUp/SignUpComponent';

function App() {
	const [Loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();
	const auth = getAuth();

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 100);
	}, []);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				console.log('From App. No User Present');
				navigate('/signin');
			}
		});
	}, []);

	return (
		<div className="App">
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<MainNavbar />
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
					</Routes>
				</>
			)}
		</div>
	);
}

export default App;
