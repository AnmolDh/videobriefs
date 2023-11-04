"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [ytUrl, setYtUrl] = useState("");

const handleSubmit = async () => {
  try {
    let videoId = "";
    if (ytUrl.includes("youtu.be")) {
      videoId = ytUrl.split("youtu.be/")[1].split("?")[0];
      console.log(ytUrl.split("youtu.be/"))
    } else {
      videoId = ytUrl.split("v=")[1];
    }
    router.push(`/summarize?videoId=${videoId}`);
  } catch (error: any) {
    toast.error("Something Went Wrong!");
  }
};

  return (
    <main
      className="min-h-screen flex flex-col items-center px-10"
      style={{
        backgroundImage: `url('bg.svg')`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "white",
      }}
    >
      <Toaster />
      <div className="flex flex-col justify-center items-center pt-10">
        <Image src="logo.svg" width={50} height={50} alt="logo"></Image>
        <h1 className="font-bold text-2xl">VideoBriefs</h1>
      </div>
      <div className="text-center flex flex-col flex-1 pt-32 items-center">
        <h1 className="font-bold text-5xl lg:text-7xl">
          Don't Want to Watch the Whole Video? - Try VideoBriefs!
        </h1>
        <input
          type="text"
          className="border bg-black rounded-3xl text-white text-xl p-2 mt-14 text-center w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
          placeholder="YouTube URL"
          name="url"
          value={ytUrl}
          onChange={(e) => setYtUrl(e.target.value)}
        ></input>
        <button
          className="border bg-black rounded-2xl text-white p-1.5 mt-4"
          onClick={handleSubmit}
        >
          Summarize
        </button>
      </div>
    </main>
  );
}
