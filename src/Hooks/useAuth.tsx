import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../config/Firebase';

const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		return auth.onAuthStateChanged((user) => {
			setUser(user);
			setIsLoading(false);
		});
	}, []);

	return {
		user,
		isLoading,
	};
};

export default useAuth;
