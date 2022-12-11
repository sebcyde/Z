import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { deleteUser, updateEmail, updatePassword } from 'firebase/auth';
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

export const DeleteAccount = async (user: any) => {
	console.log(`Starting removal of user: ${user.uid}.`);
	await deleteDoc(doc(db, `Users/${user?.uid}`));
	console.log('Removal from Database successful.');
	await deleteUser(user);
	console.log('Removal from Auth object successful.');
};
