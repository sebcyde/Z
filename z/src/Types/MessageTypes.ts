export type ChatObject = {
	ChatID: string;
	Messages: MessageObject[];
	users: string[];
};

export type MessageObject = {
	Message: string;
	Timestamp: number;
	Sender: string;
};

export type NotifObject = {
	Time: number;
	Username: string;
	Type: string;
	Image: string;
};
