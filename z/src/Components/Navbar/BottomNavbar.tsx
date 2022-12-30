import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import { Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDocument } from 'react-firebase-hooks/firestore';
import { app, auth } from '../../config/Firebase';
import { doc, getFirestore } from '@firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

type Props = {};

function BottomNavbar({}: Props) {
	const [Value, setValue] = useState('');
	const navigate = useNavigate();

	const [user] = useAuthState(auth);
	const [value] = useDocument(doc(getFirestore(app), `Users/${user?.uid}`));

	return (
		<Paper
			sx={{
				position: 'fixed',
				bottom: 0,
				left: 0,
				right: 0,
				backgroundColor: 'black',
				zIndex: '2',
			}}
			elevation={10}
			className="BottomNav"
		>
			<BottomNavigation
				showLabels
				value={Value}
				onChange={(event, newValue) => {
					if (newValue == 'Home') navigate('/');
					else if (newValue == 'Search') navigate('/search');
					else if (newValue == 'Friends') navigate('/friends');
					else if (newValue == 'Notifications') navigate('/notifications');
					else if (newValue == 'Messages') navigate('/allchats');
					else if (newValue == 'Settings') navigate('/settings');
				}}
			>
				{/* <BottomNavigationAction
					value="Messages"
					label="Messages"
					icon={<GroupIcon />}
				/> */}
				<BottomNavigationAction value="Home" label="Home" icon={<HomeIcon />} />

				<BottomNavigationAction
					value="Search"
					label="Search"
					icon={<SearchIcon />}
				/>
				<BottomNavigationAction
					value="Notifications"
					label="Notifications"
					icon={<NotificationsIcon />}
					className={
						value?.data()?.LastSeen < value?.data()?.LatestNotification
							? 'NewNotification'
							: ''
					}
				/>

				<BottomNavigationAction
					value="Messages"
					label="Messages"
					icon={<EmailIcon />}
				/>
				{/* <BottomNavigationAction
					value="Friends"
					label="Friends"
					icon={<GroupIcon />}
				/> */}
			</BottomNavigation>
		</Paper>
	);
}

export default BottomNavbar;
