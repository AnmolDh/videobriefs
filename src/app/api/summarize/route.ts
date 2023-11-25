import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getTranscript } from "@/helpers/getTranscript";

// export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { videoId, inDepth, bullets } = await req.json();

  let ts = await getTranscript(videoId);
  const prompt = `${ts}
  }.`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",

    stream: true,
    messages: [
      {
        role: "assistant",
        content: `summarize this youtube video transcript ${
          inDepth ? "in deep depth" : ""
        }.`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 200,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
