import React from 'react';
import UserDetails from '../../Components/Settings/UserDetails';
import SettingsBottom from '../../Components/Settings/SettingsBottom';

type Props = {};

function Settings({}: Props) {
	return (
		<div>
			<UserDetails />
			<SettingsBottom />
		</div>
	);
}

export default Settings;
