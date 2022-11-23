import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBWxMuu0BJr3FOjUj0U7pXCq4ZjqUfkqn0',
	authDomain: 'projectz-d8fdf.firebaseapp.com',
	projectId: 'projectz-d8fdf',
	storageBucket: 'projectz-d8fdf.appspot.com',
	messagingSenderId: '122607333826',
	appId: '1:122607333826:web:538eb444c27c2f6329e65b',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign Up New Users
createUserWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
		// Signed in
		const user = userCredential.user;
		console.log('Signed up as:', user);
	})
	.catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.log(`Error ${errorCode}:`, errorMessage);
	});

// Sign In Existing Users
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
	});

// User Observer
onAuthStateChanged(auth, (user) => {
	if (user) {
		// User is signed in
		const uid = user.uid;
		console.log('State Changed for:', user);
		// ...
	} else {
		// User is signed out
		// ...
		console.log('Signed Out Successfully');
	}
});
