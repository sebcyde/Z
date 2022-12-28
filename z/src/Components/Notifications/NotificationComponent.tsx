import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import { db } from '../../config/Firebase';

type Props = {
	Type: string;
	User: string;
	Timestamp: number;
	Image: string;
};

const NotificationComponent = ({ Type, User, Timestamp, Image }: Props) => {
	return (
		<div className="NoticationContainer">
			<div className="ImageContainer">
				<img src={Image} />
			</div>

			{Type == 'Follow' ? (
				<span>
					<p className="NotificationTitle">{User} followed you.</p>{' '}
					<p className="NotificationTimestamp">{Timestamp}</p>
				</span>
			) : (
				''
			)}
			{Type == 'Message' ? (
				<span>
					<p className="NotificationTitle">{User} sent you a message.</p>
					<p className="NotificationTimestamp">{Timestamp}</p>
				</span>
			) : (
				''
			)}
		</div>
	);
};

export default NotificationComponent;
