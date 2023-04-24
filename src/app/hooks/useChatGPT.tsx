import { useMutation } from "@tanstack/react-query";
import { MessagePayload } from "../api/generate/route";
import { useMessageStore } from "../stores/messageStore";

interface GenerateHook extends MessagePayload {
	conversationId: string;
}

export default function useGenerate() {
	return useMutation({
		mutationKey: ["chatgpt"],
		mutationFn: async (payload: GenerateHook) => {
			const response = await fetch("/api/generate", {
				method: "POST",
				body: JSON.stringify({
					messages: payload.messages,
					conversationId: payload.conversationId,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("Invalid response");
			}

			const data = await response.json();

			return data;
		},
		onSuccess: (data) => {
			const allMessages = useMessageStore.getState().messages;
			useMessageStore.setState({
				fetching: false,
				messages: [
					...allMessages,
					{
						role: "assistant",
						content: data.message,
					},
				],
			});
		},
	});
}
