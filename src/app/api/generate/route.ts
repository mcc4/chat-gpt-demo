import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export interface MessagePayload {
	messages: {
		role: "user" | "assistant" | "system";
		content: string;
	}[];
}

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY as string,
});

export const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
	const body: MessagePayload = await req.json();

	const systemMessage = {
		role: "system",
		content:
			"You are an expert creative writer. All responses must be in markdown format",
	};

	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [systemMessage as any, ...body.messages],
		temperature: 0.9,
	});
	const responseMessage = response?.data?.choices?.[0]?.message?.content;

	return NextResponse.json({
		message: responseMessage,
		status: 200,
	});
}
