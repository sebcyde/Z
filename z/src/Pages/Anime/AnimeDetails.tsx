import { Update } from '../../Store/Slices/AnimeSlice';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import SimilarBanner from '../../Components/Anime/SimilarBanner';
import LoadingScreen from '../LoadingScreen';
import YouTubeEmbed from '../../Components/YouTube/YouTubeEmbed';
import { useNavigate } from 'react-router-dom';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { DocumentData } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import '../../Styles/Modal.scss';
import { LoadingButton } from '@mui/lab';
import { Rating } from '@mui/material';
import BreadCrumbNavbar from '../../Components/Navbar/BreadCrumbNavbar';
import AnimeSynopsisComponent from '../../Components/Anime/AnimeSynopsisComponent';
import { GetUserData } from '../../Functions/UserDetails/GetUserData';

function AnimeDetails() {
	const StoreID = useSelector((state: any) => state.IDState);
	const [UserDetails, setUserDetails] = useState<
		DocumentData | null | undefined
	>();
	const [Loading, setLoading] = useState<boolean>(true);
	const [AnimeData, setAnimeData] = useState<any>();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const auth = getAuth();
	const user = auth.currentUser;

	const ResetID = () => {
		dispatch(Update(0));
		navigate('/');
	};

	const PullData = async () => {
		const RawAnimedata = await axios.get(
			`https://api.jikan.moe/v4/anime/${StoreID.id}/full`
		);
		const Data = RawAnimedata.data.data;
		console.log('Anime Data:', Data);
		setAnimeData(Data);

		if (user) {
			const UserData = user ? await GetUserData(user?.uid) : '';
			setUserDetails(UserData != '' ? UserData : null);
			console.log('User Data:', UserData);
		}

		setLoading(false);
	};

	useEffect(() => {
		PullData();
	}, [StoreID]);

	return (
		<>
			<BreadCrumbNavbar />
			<div className="page" style={{ overflowY: 'scroll' }}>
				{Loading ? (
					<LoadingScreen />
				) : (
					<>
						<div className="AnimeDetailsContainer">
							<img src={AnimeData.images.jpg.large_image_url} />
							<h2
								className="AnimeTitle "
								style={AnimeData.score ? undefined : { marginBottom: '15px' }}
							>
								{AnimeData.title}
							</h2>
							{AnimeData.score ? (
								<>
									<span className="AnimeRating">
										<Rating
											name="half-rating-read"
											value={AnimeData.score / 2}
											precision={0.1}
											readOnly
										/>
										<p>Average: {AnimeData.score}</p>
									</span>
								</>
							) : (
								''
							)}

							<LoadingButton
								variant="outlined"
								onClick={() => navigate('/addtolist')}
							>
								<PlaylistAddIcon style={{ marginRight: '5px' }} />
								<p>Add To MyList</p>
							</LoadingButton>

							{AnimeData.airing == false &&
							AnimeData.status === 'Not yet aired' ? (
								<p
									className="AnimeSynopsis"
									style={{ margin: '15px 0px 0px 15px' }}
								>
									{AnimeData.status}
								</p>
							) : (
								''
							)}
							<AnimeSynopsisComponent Synopsis={AnimeData.synopsis} />
						</div>
						{AnimeData.trailer.youtube_id ? (
							<YouTubeEmbed ID={AnimeData.trailer.youtube_id} />
						) : (
							''
						)}

						<SimilarBanner Genres={AnimeData.genres} Title={AnimeData.title} />
					</>
				)}

				{UserDetails && UserDetails.Admin ? (
					<>
						<Button onClick={ResetID}>Reset ID</Button>
					</>
				) : (
					''
				)}
			</div>
		</>
	);
}

export default AnimeDetails;
