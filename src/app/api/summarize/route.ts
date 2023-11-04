import { NextRequest, NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { ytUrl } = reqBody;
    const tsData = await YoutubeTranscript.fetchTranscript(ytUrl);

    let ts = "";
    tsData.forEach((item) => {
      ts += item.text + " ";
    });

    return NextResponse.json({ summary: ts });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
