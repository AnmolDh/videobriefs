export default function validateUrl(ytUrl: any) {
  if (!ytUrl.includes("youtube") && !ytUrl.includes("youtu.be")) {
    return "";
  }
  let videoId = "";
  if (ytUrl.includes("youtu.be")) {
    videoId = ytUrl.split("youtu.be/")[1].split("?")[0];
  } else {
    videoId = ytUrl.split("v=")[1];
  }
  return videoId;
}