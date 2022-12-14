import { Chip } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import LoadingScreen from '../../Pages/LoadingScreen';
import { Anime } from '../../Types/AnimeTypes';
import AnimeItem from '../Anime/AnimeItem';

type Props = { Query: string | undefined; SearchType: string };

function SearchResults({ Query, SearchType }: Props) {
	const [Loading, setLoading] = useState<boolean>();
	const [List, setList] = useState<any>();

	const AnimeSearch = async (SearchQuery: string) => {
		console.log('Searching anime for:', SearchQuery);
		axios
			.get(`https://api.jikan.moe/v4/anime?q=${SearchQuery}&limit=50&sfw=false`)
			.then((response) => {
				const ReturnedAnime = response.data.data;
				console.log(ReturnedAnime);
				setList(
					<>
						{ReturnedAnime.map((Anime: Anime, key: number) => {
							return <AnimeItem Anime={Anime} />;
						})}
					</>
				);
			})
			.then(() => setLoading(false));
	};

	const MangaSearch = async (SearchQuery: string) => {
		console.log('Searching manga for:', SearchQuery);
		axios
			.get(`https://api.jikan.moe/v4/manga?q=${SearchQuery}&limit=50&sfw=false`)
			.then((response) => {
				const ReturnedManga = response.data.data;
				console.log(ReturnedManga);
				setList(
					<>
						{ReturnedManga.map((Manga: any, key: number) => {
							return (
								<div className="MangaContainer" key={key}>
									<div className="MangaDetailsContainer">
										<img
											src={Manga.images.jpg.image_url}
											className="MangaImage"
										/>
										<div className="MangaDetails">
											<h2 className="MangaTitle">{Manga.title}</h2>

											<span className="MangaRanking">
												<p>Rank: {Manga.rank}</p>
												<p>Score: {Manga.score}</p>
											</span>
											<span className="MangaGenres">
												{Manga.genres[0] ? <p>{Manga.genres[0].name}</p> : ''}
												{Manga.genres[1] ? <p>{Manga.genres[1].name}</p> : ''}
											</span>
										</div>
									</div>
									<p className="MangaAbout">{Manga.synopsis}</p>
								</div>
							);
						})}
					</>
				);
			})
			.then(() => setLoading(false));
	};

	const PeopleSearch = async (SearchQuery: string) => {
		console.log('Searching people for:', SearchQuery);
		axios
			.get(`https://api.jikan.moe/v4/people?q=${SearchQuery} `)
			.then((response) => {
				const ReturnedPeople = response.data.data;
				console.log(ReturnedPeople);
				setList(
					<>
						{ReturnedPeople.map((Person: any, key: number) => {
							return (
								<div className="PersonContainer" key={key}>
									<div className="PersonDetailsContainer">
										<img src={Person.images.jpg.image_url} />
										<div>
											{Person.given_name && Person.family_name ? (
												<>
													<h2 className="ENName">EN Name: {Person.name}</h2>
													<h2 className="JPName">
														JP Name: {Person.given_name} {Person.family_name}
													</h2>
												</>
											) : (
												<h2 className="SingleName">Name: {Person.name}</h2>
											)}
											<h3 className="PersonBirthday">
												Birthday:{' '}
												{new Date(Person.birthday).toISOString().split('T')[0]}
											</h3>
										</div>
									</div>
									<p className="PersonAbout">{Person.about}</p>
								</div>
							);
						})}
					</>
				);
			})
			.then(() => setLoading(false));
	};

	useEffect(() => {
		console.log(SearchType);
	}, [SearchType]);

	useEffect(() => {
		if (Query != undefined) {
			setLoading(true);
			if (SearchType == 'anime') {
				AnimeSearch(Query!);
			} else if (SearchType == 'manga') {
				MangaSearch(Query!);
			} else if (SearchType == 'people') {
				PeopleSearch(Query!);
			} else {
				console.log('Broken Search in UseEffect');
			}
		}
	}, [Query]);

	return (
		<div className="SearchResults">
			{Loading ? (
				<LoadingScreen />
			) : (
				<div style={{ marginBottom: '65px' }}>
					{/* {Query == undefined ? (
						<h2 className="SearchHeader">Search Our Database</h2>
					) : (
						<h2 className="SearchHeader">Results For: {Query}</h2>
					)} */}
					{List}
				</div>
			)}
		</div>
	);
}

export default SearchResults;
