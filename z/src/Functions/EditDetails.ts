import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { updateEmail, updatePassword } from 'firebase/auth';
import { db } from '../config/Firebase';

export const UpdateDisplayName = async (User: any, NewUserName: string) => {
	const UserRef = doc(db, `Users/${User?.uid}`);
	await updateDoc(UserRef, { Username: NewUserName });
	console.log('Username update succesful');
};

export const UpdateEmail = async (User: any, NewEmail: string) => {
	const UserRef = doc(db, `Users/${User?.uid}`);
	await updateDoc(UserRef, { UserEmail: NewEmail });
	await updateEmail(User, NewEmail);
	console.log('Email update succesful');
};

export const UpdatePassword = async (User: any, NewPassword: string) => {
	await updatePassword(User, NewPassword);
	console.log('Password update succesful');
};
