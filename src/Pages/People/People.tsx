import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen';

type Props = {};

function People({}: Props) {
	const [Loading, setLoading] = useState<boolean>(true);
	const [TopPeople, setTopPeople] = useState<any>();
	useEffect(() => {
		axios
			.get('https://api.jikan.moe/v4/top/people')
			.then((response) => {
				const Top = response.data.data;
				console.log(Top);
				setTopPeople(Top);
			})
			.then(() => setLoading(false));
	}, []);

	return (
		<div className="Page PeopleContainer">
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<h2
						style={{
							margin: '5px',
							marginLeft: '10px',
						}}
					>
						Top People
					</h2>
					{TopPeople.map((Person: any, key: number) => {
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
			)}
		</div>
	);
}

export default People;
