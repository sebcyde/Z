import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import NotificationComponent from '../../Components/Notifications/NotificationComponent';
import { auth, db } from '../../config/Firebase';
import { NotiSort } from '../../Functions/TimeSort';
import { NotifObject } from '../../Types/MessageTypes';
import LoadingScreen from '../LoadingScreen';

type Props = {};

const AllNotifications = (props: Props) => {
	const [Loading, setLoading] = useState<boolean>(true);
	const [NotiData, setNotiData] = useState<NotifObject[]>();
	const [user] = useAuthState(auth);

	// Retrieve Notifications from DB
	const PullData = async () => {
		const docRef = doc(db, `Users/${user?.uid}/Notifications/AllNotifications`);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			console.log('Notifications Data:', NotiSort(docSnap.data().Notif));
			setNotiData(NotiSort(docSnap.data().Notif).reverse());
		} else {
			console.log(`Failed to retrieve notifications for user: ${user?.uid}`);
		}
	};

	useEffect(() => {
		PullData().then(() => setLoading(false));
	}, []);

	return (
		<div>
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					{NotiData?.map((Notif) => (
						<NotificationComponent
							Type={Notif.Type}
							Timestamp={Notif.Time}
							User={Notif.Username}
							Image={Notif.Image}
						/>
					))}
				</>
			)}
		</div>
	);
};

export default AllNotifications;
