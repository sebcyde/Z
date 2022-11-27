import { initializeApp } from 'firebase/app';
import { doc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth';

const config = {
	firebase: {
		apiKey: 'AIzaSyBWxMuu0BJr3FOjUj0U7pXCq4ZjqUfkqn0',
		authDomain: 'projectz-d8fdf.firebaseapp.com',
		projectId: 'projectz-d8fdf',
		storageBucket: 'projectz-d8fdf.appspot.com',
		messagingSenderId: '122607333826',
		appId: '1:122607333826:web:538eb444c27c2f6329e65b',
	},
};

export const app = initializeApp(config.firebase);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Sign Up New Users
export const SignUp = async (auth: any, email: string, password: string) => {
	try {
		const UserCred = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = UserCred.user;
		console.log('Signed up as:', user);

		await setDoc(doc(db, `Users/${user.uid}`), {
			UserEmail: user.email,
			Username: user.displayName,
			DisplayPicture: user.photoURL,
			CreationDate: user.metadata.creationTime,
			// UserLists: { Favourites: [] },
			UID: user.uid,
		});

		await setDoc(doc(db, `Users/${user.uid}/MoreInfo/Lists`), {
			Favourites: [],
		});

		console.log('User Creation Successful:');
	} catch (error: any) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.log(`Error ${errorCode}:`, errorMessage);
	}
};

// Sign In Existing Users
export const SignIn = async (auth: any, email: string, password: string) => {
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			console.log('Signed in as:', user);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(`Error ${errorCode}:`, errorMessage);
			alert('Invalid Credentials');
		});
};
