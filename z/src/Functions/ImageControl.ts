import { getAuth, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../config/Firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
	const UserStorageRef = ref(storage, user?.uid);
	// Retrieve user details from DB
	const UserRef = doc(db, `Users/${user?.uid}`);
	const docSnap = await getDoc(UserRef);
	const URL = await getDownloadURL(
		ref(UserStorageRef, `${docSnap.data()!.DisplayPicture}`)
	);
	return URL;
};
