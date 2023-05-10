import "./styles/globals.css";
import QueryClientProvider from "./queryClient";

export const metadata = {
	title: "Chat GPT DEMO",
	description: "Generated responses from the OpenAI GPT-3.5 API",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<QueryClientProvider>{children}</QueryClientProvider>
			</body>
		</html>
	);
}
