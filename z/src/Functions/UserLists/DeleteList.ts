import { doc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../../config/Firebase';

export const DeleteList = async (UID: string, ListName: string) => {
	console.log('Deleting', ListName);

	const DocRef = doc(db, `Users/${UID}/MoreInfo`, 'Lists');
	await updateDoc(DocRef, {
		[ListName]: deleteField(),
  });
  
  console.log(`Successfull deleted ${ListName}`)
};
