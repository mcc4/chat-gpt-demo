import { create } from "zustand";

interface MessageStore {
	messages: any[];
	conversationId: string;
	fetching: boolean;
}

export const useMessageStore = create<MessageStore>(() => ({
	messages: [],
	conversationId: "",
	fetching: false,
}));
