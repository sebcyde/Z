import { MessageObject, NotifObject } from '../Types/MessageTypes';

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

export const NotiSort = (Array: NotifObject[]) => {
	return Array.sort((a: NotifObject, b: NotifObject) => {
		if (a.Time > b.Time) {
			return -1;
		}
		if (a.Time < b.Time) {
			return 1;
		}
		return 0;
	});
};
