import { Client } from "youtubei";

export async function getTranscript(videoId: string) {
  const youtube = new Client();

  try {
    const tsData = await youtube.getVideoTranscript(videoId);
    if (tsData) {
      let ts = "";
      tsData?.forEach((item) => {
        ts += item.text + " ";
      });

      return ts;
    } else {
      throw new Error("transcript not found");
    }
  } catch (error) {
    console.error("Error getting transcript:", error);
    throw error;
  }
}
