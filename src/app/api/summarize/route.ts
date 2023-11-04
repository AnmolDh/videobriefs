import { NextRequest, NextResponse } from "next/server";
import { Client } from "youtubei";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { videoId, inDepth, bullets } = reqBody;

    const youtube = new Client();
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

    const tsData = await youtube.getVideoTranscript(videoId);

    let ts = "";
    tsData?.forEach((item) => {
      ts += item.text + " ";
    });

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `${ts} summarize this youtube video transcript ${
            inDepth ? "in deep depth" : ""
          }. Respond with JSON Object with title and summary (array of points) key.`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const messageContent = completion.choices[0].message.content;
    let res = null;
    if (messageContent) {
      try {
        res = JSON.parse(messageContent);
      } catch (error) {
        return NextResponse.json(
          { message: "Invalid response from OpenAI" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(res, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
