import React from 'react';

type Props = {
	Event: string;
	User?: string;
	Timestamp: number;
};

const NotificationComponent = ({ Event, User, Timestamp }: Props) => {
	const Notication = () => {
		return (
			<div className="NoticationContainer">
				<div className="ImageContainer">
					<img />
				</div>
				{Event == 'Follow' ? <p>{User} followed you.</p> : ''}
				{Event == 'Message' ? <p>{User} sent you a message.</p> : ''}
				
			</div>
		);
	};

	return <div>NotificationComponent</div>;
};

export default NotificationComponent;
