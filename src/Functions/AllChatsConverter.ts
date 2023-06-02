export const AllChatsConverter = (Array: any[]) => {
	let NewArray: any[] = [];

	const set = new Set<any[]>();

	Array.forEach((chatDoc: any) => {
		const chatData = chatDoc.data();

		const {
			MessageID = '',
			MessageObject: { Message, SendingUser, Time },
			Users,
		}: {
			MessageID: string;
			MessageObject: { Message: string; SendingUser: string; Time: any };
			Users: any[];
		} = chatData;

		const Reciever = Users[Users.length - 1];

		let found = false;
		for (const array of set) {
			if (array[0].MessageID === MessageID) {
				array.push({ MessageID, Message, SendingUser, Reciever, Time });
				found = true;
				break;
			}
		}

		if (!found) {
			set.add([{ MessageID, Message, SendingUser, Reciever, Time }]);
		}
	});

	return [...set];
};
