import { z } from "zod";

const roleEnum = z.enum(["user", "assistant", "system"]);
const promptResponseSchhema = z.object({
	id: z.string(),
	object: z.string(),
	created: z.number(),
	model: z.string(),
	usage: z.object({
		prompt_tokens: z.number(),
		completion_tokens: z.number(),
		total_tokens: z.number(),
	}),
	choices: z.array(
		z.object({
			message: z.object({
				role: roleEnum,
				content: z.string(),
			}),
			finish_reason: z.string(),
			index: z.number(),
		})
	),
});

const promptInputSchema = z.object({
	error: z.boolean().optional(),
	role: roleEnum,
	content: z.string(),
});

export type PromptInput = z.infer<typeof promptInputSchema>;
export type PromptResponse = z.infer<typeof promptResponseSchhema>;
export type Role = z.infer<typeof roleEnum>;
