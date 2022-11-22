import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

type Props = { Query: string | undefined };

function SearchResults({ Query }: Props) {
	const debounce = (fn: Function, ms = 1000) => {
		let timeoutId: ReturnType<typeof setTimeout>;
		return function (this: any, ...args: any[]) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => fn.apply(this, args), ms);
		};
	};

	useEffect(() => {
		console.log(Query);
	}, [Query]);

	return (
		<div>
			{Query}
			<Tabs
				defaultActiveKey="anime"
				id="uncontrolled-tab-example"
				className="mb-3"
			>
				<Tab eventKey="anime" title="Anime">
					example anime
				</Tab>
				<Tab eventKey="manga" title="Manga">
					example manga
				</Tab>
				<Tab eventKey="people" title="People">
					example people
				</Tab>
			</Tabs>
		</div>
	);
}

export default SearchResults;
