import { google } from "@ai-sdk/google";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";

import { allProducts } from "@/lib/catalog";
import { buildSystemPrompt } from "@/lib/chat/systemPrompt";
import { isRateLimited } from "@/lib/chat/rateLimit";

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return new Response(
      "Too many requests. Please wait a moment and try again.",
      { status: 429 },
    );
  }

  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google("gemini-flash-lite-latest"),
    system: buildSystemPrompt(allProducts),
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 1024,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
