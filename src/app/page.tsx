import MessageList from "./components/messageList";
import MessageForm from "./components/messageForm";

export default function Home() {
	return (
		<div className="flex flex-row w-full h-screen">
			<aside className="flex flex-col flex-shrink-0 w-64 h-full px-4 py-8 bg-gray-800 ">
				SIDEBAR
			</aside>

			<main className="flex flex-col flex-1 h-screen p-8 grow">
				<MessageList />
				<MessageForm />
			</main>
		</div>
	);
}
