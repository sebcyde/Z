import { MessageObject } from '../Types/MessageTypes';

export const TimeSort = (Array: MessageObject[]) => {
	return Array.sort((a: MessageObject, b: MessageObject) => {
		if (a.Timestamp > b.Timestamp) {
			return -1;
		}
		if (a.Timestamp < b.Timestamp) {
			return 1;
		}
		return 0;
	});
};

export const ChatSort = (Array: any) => {
	let Data = Array.map((Doc: any) => Doc.data());
	console.log('Chat Sort Data:', Data);
	return Data.sort((a: any, b: any) => {
		if (TimeSort(a.Messages)[0].Timestamp > TimeSort(b.Messages)[0].Timestamp) {
			return -1;
		}
		if (TimeSort(a.Messages)[0].Timestamp < TimeSort(b.Messages)[0].Timestamp) {
			return 1;
		}
		return 0;
	});
};
