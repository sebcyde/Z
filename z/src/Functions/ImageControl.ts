import { getAuth } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../config/Firebase';

const auth = getAuth();
const user = auth.currentUser;
const UserStorageRef = ref(storage, user?.uid);

export const ImageUpload = async (File: File) => {
	uploadBytes(UserStorageRef, File).then((snapshot) => {
		console.log('Snapshot metadata:', snapshot.metadata);
		console.log('Uploaded image:', File.name);
	});
};

export const RetrieveImage = async () => {
	const URL = await getDownloadURL(ref(UserStorageRef));
	return URL;
};
