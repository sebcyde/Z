import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { db } from '../../config/Firebase';
import { SetUser } from '../../Store/Slices/ListSlice';

type Props = {
	Type: string;
	User: string;
	Timestamp: string;
	Image: string;
};

const NotificationComponent = ({ Type, User, Timestamp, Image }: Props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const OpenChat = () => {
	// 	dispatch(SetUser(Recipients[0].UID));
	// 	navigate('/message');
	// };

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
