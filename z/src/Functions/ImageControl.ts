import { getAuth, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../config/Firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import DefaultGirl from '../assets/PFP/girl2.png';

export const ImageUpload = async (user: any, File: File) => {
	const UserStorageRef = ref(storage, user?.uid);
	const UserRef = doc(db, `Users/${user?.uid}`);
	const UserImageRef = ref(storage, `${user?.uid}/${File.name}`);
	console.log('File Name:', File.name);

	// Update in Firestore
	await setDoc(UserRef, { DisplayPicture: File.name }, { merge: true });

	// Update in Auth - doesn't work sometimes
	// await updateProfile(user!, { photoURL: File.name });

	// Update in Cloud Storage
	uploadBytes(UserImageRef, File).then((snapshot) => {
		console.log('Snapshot metadata:', snapshot.metadata);
		console.log('Uploaded image:', File.name);
	});
};

export const RetrieveImage = async (user: any) => {
	// Retrieve user details from DB
	const UserRef = doc(db, `Users/${user?.uid}`);
	const docSnap = await getDoc(UserRef);

	const DefaultStorageRef = ref(storage, `DefaultImages/girl1.png`);
	const UserStorageRef = ref(storage, user?.uid);

	// Need to somehow default one or the other
	const URL = await getDownloadURL(
		ref(
			UserStorageRef ? UserStorageRef : DefaultStorageRef,
			`${docSnap.data()!.DisplayPicture}`
		)
	);

	return URL;
};

export const DefaultImageUpload = async (user: any) => {
	// Need to upload an initial image to cloud otherwise Retrieve function wont work as cant load page without image
	const UserStorageRef = ref(storage, user?.uid);

	// These update perfectly
	const UserRef = doc(db, `Users/${user?.uid}`);
	// await updateProfile(user!, { photoURL: URL });
	await setDoc(UserRef, { DisplayPicture: URL }, { merge: true });
};
