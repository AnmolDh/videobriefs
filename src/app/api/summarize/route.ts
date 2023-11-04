import { NextRequest, NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });
    const reqBody = await req.json();
    const { ytUrl } = reqBody;
    const tsData = await YoutubeTranscript.fetchTranscript(ytUrl);

    let ts = "";
    tsData.forEach((item) => {
      ts += item.text + " ";
    });

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `${ts} summarize this youtube video transcript`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    return NextResponse.json({ summary: completion.choices[0].message.content }, {status: 200});
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
