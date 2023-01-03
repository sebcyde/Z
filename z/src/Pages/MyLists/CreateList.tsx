import React from 'react';

type Props = {};

const CreateList = (props: Props) => {
	// const handleInputChange = (event: any) => {
	// 	setNewListRef(event?.target.value);
	// };

	// const AddNewList = async () => {
	// 	console.log(NewListRef);
	// 	const NewListName = NewListRef.toString();

	// 	if (user && NewListName.length > 0) {
	// 		const UserDB = doc(db, `Users/${user.uid}/MoreInfo/Lists`);
	// 		await updateDoc(UserDB, {
	// 			[NewListName.toString()]: [],
	// 		});

	// 		setEditing(false);
	// 		setNewListRef('');
	// 		console.log('Item Added To:', NewListName);
	// 		handleClose2();
	// 	}
	// };

	return <div>CreateList</div>;
};

export default CreateList;
