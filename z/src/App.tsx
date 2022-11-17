import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Anime from './Pages/Anime/Anime';
import Homepage from './Pages/Homepage';
import LoadingScreen from './Pages/LoadingScreen';
import Manga from './Pages/Manga/Manga';
import MyLists from './Pages/MyLists';
import Settings from './Pages/Settings';
import MainNavbar from './Components/Navbar/MainNavbar';
import AnimeDetails from './Pages/Anime/AnimeDetails';

function App() {
	const [Loading, setLoading] = useState<boolean>(true);
	const IDState = useSelector((state: any) => state.IDState);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 100);
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
						<Route path="anime" element={<Anime />}>
							<Route path="animedetails" element={<AnimeDetails />} />
						</Route>
						{/* <Route path="animedetails" element={<AnimeDetails />} /> */}
						<Route path="manga" element={<Manga />} />
						<Route path="mylists" element={<MyLists />} />
						<Route path="settings" element={<Settings />} />
					</Routes>
				</>
			)}
		</div>
	);
}

export default App;
