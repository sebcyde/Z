export const GetRecipientsEmails = (
	LoggedInUser: string,
	UsersArray: string[]
) => {
	const Recipients = UsersArray.filter((User) => {
		return User.toLocaleLowerCase() != LoggedInUser.toLocaleLowerCase();
	});

	return Recipients;
};
