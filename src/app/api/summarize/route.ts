import { NextRequest, NextResponse } from "next/server";
import { Client } from "youtubei";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { videoId } = reqBody;
    
    const youtube = new Client();
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

    const video = await youtube.getVideo(videoId);
    const tsData = await youtube.getVideoTranscript(videoId);

    let ts = "";
    tsData?.forEach((item) => {
      ts += item.text + " ";
    });

    return NextResponse.json({ summary: ts }, { status: 200 });

    // const completion = await openai.chat.completions.create({
    //   messages: [
    //     {
    //       role: "user",
    //       content: `${ts} summarize this youtube video transcript`,
    //     },
    //   ],
    //   model: "gpt-3.5-turbo",
    // });

    // return NextResponse.json({ summary: completion.choices[0].message.content }, {status: 200});
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
