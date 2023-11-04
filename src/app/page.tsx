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
    if (!ytUrl.includes("youtube") || !ytUrl.includes("youtu.be")) {
      toast.error("Invalid YouTube URL!");
      return;
    }
    let videoId = "";
    if (ytUrl.includes("youtu.be")) {
      videoId = ytUrl.split("youtu.be/")[1].split("?")[0];
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
      className="min-h-screen flex flex-col items-center lg:px-10"
      style={{
        backgroundImage: `url('bg.svg')`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "white",
      }}
    >
      <Toaster />
      <header className="flex flex-col justify-center items-center pt-10">
        <Image src="logo.svg" width={50} height={50} alt="logo"></Image>
        <h1 className="font-bold text-2xl">VideoBriefs</h1>
      </header>
      <div className="text-center flex flex-col flex-1 pt-32 items-center">
        <h1 className="font-bold text-5xl lg:text-7xl lg:px-10">
          Don't Want to Watch the Whole Video? - Try VideoBriefs!
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col items-center w-full sm:w-3/4 md:w-1/2 lg:w-2/5"
        >
          <input
            type="text"
            className="border bg-black rounded-3xl text-white text-xl p-2 mt-14 text-center lg:w-full"
            placeholder="YouTube URL"
            name="url"
            value={ytUrl}
            onChange={(e) => setYtUrl(e.target.value)}
          ></input>
          <button
            type="submit"
            className="border bg-black rounded-2xl text-white p-1.5 mt-4"
          >
            Summarize
          </button>
        </form>
      </div>
    </main>
  );
}
