"use client";

import { useMessageStore } from "../stores/messageStore";

export default function MessageList() {
	const { messages, fetching } = useMessageStore();

	return (
		<>
			<div className="flex flex-col flex-1 p-6 border rounded grow">
				{messages.map((message, index) => {
					return (
						<div
							key={`message-${index}`}
							className={`flex flex-row ${
								message.role === "assistant"
									? "bg-slate-900 rounded p-2 text-white"
									: "bg-slate-700 rounded p-2 text-white"
							}`}
						>
							{message.content}
						</div>
					);
				})}

				{fetching && <div>Loading.....</div>}
			</div>
		</>
	);
}
