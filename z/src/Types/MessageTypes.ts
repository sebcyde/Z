export type MessageObject = {
	Message: string;
	Timestamp: {
		seconds: number;
		nanoseconds: number;
	};
	Sender: string;
};
