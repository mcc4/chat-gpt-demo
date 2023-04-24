"use client";

import { useEffect } from "react";
import useGenerate from "../hooks/useChatGPT";
import { useMessageStore } from "../stores/messageStore";
import { v4 as uuidv4 } from "uuid";

export default function MessageForm() {
	const { mutate, isLoading } = useGenerate();
	const { conversationId, messages } = useMessageStore();

	useEffect(() => {
		if (conversationId === "") {
			useMessageStore.setState({ conversationId: uuidv4() });
		}
	}, [conversationId]);

	const handleSubmit = () => {
		const message = document.getElementById(
			"message-box"
		) as HTMLTextAreaElement;

		// 1. Cross check the conversationId, and add a new one if it doesn't exist
		// 2. Add the new message to the chat store
		// 3. Hit the generate API to get a response
		// 4. Add the response to the chat store
		// 5. Store the messages in the database using the conversationId

		const newMessages = [
			...messages,
			{
				role: "user",
				content: message.value,
			},
		];

		useMessageStore.setState({ messages: newMessages, fetching: true });

		mutate({
			messages: newMessages,
			conversationId: conversationId,
		});
	};

	return (
		<div className="flex flex-col flex-shrink-0 mt-5">
			<textarea
				id="message-box"
				className="w-full textarea textarea-bordered"
				placeholder="Ask CHATGPT a question!"
			/>
			<button
				onClick={handleSubmit}
				className={`flex self-end mt-3 btn btn-primary ${
					isLoading ? "loading" : ""
				}`}
			>
				Submit
			</button>
		</div>
	);
}
