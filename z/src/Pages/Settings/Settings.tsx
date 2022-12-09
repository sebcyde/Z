import React, { useEffect, useState } from 'react';
import SettingsBottom from '../../Components/Settings/SettingsBottom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';
import { getAuth } from 'firebase/auth';
import LoadingScreen from '../LoadingScreen';
import SettingsTop from '../../Components/Settings/SettingsTop';

function Settings() {
	return (
		<div>
			<SettingsTop />
			<SettingsBottom />
		</div>
	);
}

export default Settings;
