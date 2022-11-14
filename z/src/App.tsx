import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Anime from './Pages/Anime';
import Homepage from './Pages/Homepage';
import LoadingScreen from './Pages/LoadingScreen';
import Manga from './Pages/Manga';
import MyLists from './Pages/MyLists';
import Settings from './Pages/Settings';
import MainNavbar from './Components/Navbar/MainNavbar';

function App() {
	const [Loading, setLoading] = useState<boolean>(true);

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
						<Route path="anime" element={<Anime />} />
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
