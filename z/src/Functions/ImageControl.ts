import { getAuth, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../config/Firebase';
import { doc, setDoc } from 'firebase/firestore';

const auth = getAuth();
const user = auth.currentUser;
const UserStorageRef = ref(storage, user?.uid);
const UserRef = doc(db, `Users/${user?.uid}`);

export const ImageUpload = async (File: File) => {
	const UserImageRef = ref(storage, `${user?.uid}/${File.name}`);
	console.log('File Name:', File.name);

	// Update in Firestore
	await setDoc(UserRef, { DisplayPicture: File.name }, { merge: true });

	// Update in Auth
	if (user) {
		await updateProfile(user, { photoURL: File.name });
	}

	// Update in Cloud Storage
	uploadBytes(UserImageRef, File).then((snapshot) => {
		console.log('Snapshot metadata:', snapshot.metadata);
		console.log('Uploaded image:', File.name);
	});
};

export const RetrieveImage = async () => {
	const URL = await getDownloadURL(ref(UserStorageRef, `${user?.photoURL}`));
	return URL;
};
