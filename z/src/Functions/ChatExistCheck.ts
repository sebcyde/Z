export const ChatAlreadyExists = async () => {
	return ChatValue?.docs.filter((doc) => {
		return (
			doc.data().users[0] == user?.uid &&
			doc.data().users[1] == QUserDetails.UID
		);
	});
};
