import { Update } from '../../Store/Slices/AnimeSlice';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import SimilarBanner from '../../Components/Anime/SimilarBanner/SimilarBanner';
import LoadingScreen from '../LoadingScreen';
import YouTubeEmbed from '../../Components/Anime/DetailsComponents/YouTubeEmbed';
import { useNavigate } from 'react-router-dom';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { DocumentData } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import '../../Styles/Modal.scss';
import { LoadingButton } from '@mui/lab';
import { Rating } from '@mui/material';
import BreadCrumbNavbar from '../../Components/Navbar/BreadCrumbNavbar';
import AnimeSynopsisComponent from '../../Components/Anime/DetailsComponents/SynopsisComponent';
import { GetUserData } from '../../Functions/UserDetails/GetUserData';
import RelatedBanner from '../../Components/Anime/RelatedBanner/RelatedBanner';
import { GetSingleAnime } from '../../Functions/AnimeData.ts/GetSingleAnime';

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

	const NavigateToListAdd = (AnimeID: number) => {
		dispatch(Update(AnimeID));
		navigate('/mylists');
	};

	const PullData = async () => {
		const Data = await GetSingleAnime(StoreID.id);
		setAnimeData(Data);
		if (user) {
			const UserData = await GetUserData(user?.uid);
			setUserDetails(UserData);
			console.log('Anime Data:', Data);
			console.log('User Data:', UserData);
		}
	};

	useEffect(() => {
		PullData().then(() => setLoading(false));
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
								onClick={() => NavigateToListAdd(AnimeData.mal_id)}
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

						<RelatedBanner Related={AnimeData.relations} />

						{/* <SimilarBanner Genres={AnimeData.genres} Title={AnimeData.title} /> */}
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
