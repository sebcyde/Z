import { MessageObject } from '../Types/MessageTypes';

export const TimeSort = (Array: MessageObject[]) => {
	return Array.sort((a: MessageObject, b: MessageObject) => {
		if (a.Timestamp < b.Timestamp) {
			return -1;
		}
		if (a.Timestamp > b.Timestamp) {
			return 1;
		}
		return 0;
	});
};
